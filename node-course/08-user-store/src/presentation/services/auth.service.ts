import { JwtAdapter, bcryptAdapter, envs } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { EmailService } from './email.service';




export class AuthService {
    constructor(
        private readonly emailService: EmailService,
    ){}

    public async registerUser( registerUserDto: RegisterUserDto){
        const existUser = await UserModel.findOne({ email: registerUserDto.email})
        if (existUser) throw CustomError.badRequest('email already exists')

        try {
            
            const user = new UserModel(registerUserDto);
            
            //Pass encryption
            user.password = bcryptAdapter.hash( registerUserDto.password)

            
            await user.save();
            //JWT <- user auth
            const token = JwtAdapter.generateToken({id: user.id, email: user.email})
            if (!token) throw CustomError.internalServer('Error at generating token')

            // Confirmation Email
            this.sendEmailValidationLink(user.email)

            const { password, ...rest } = UserEntity.fromObject(user);

            return{
                user: {...rest},
                token: token
            };

        } catch (error) {
            throw CustomError.internalServer(`${error}`);
        }
    }

    public async loginUser ( loginUserDto: LoginUserDto) {

        const existUser = await UserModel.findOne({email: loginUserDto.email})
        if (!existUser) throw CustomError.badRequest('email or password incorrect')

    
        const {password, ...rest} = UserEntity.fromObject(existUser)
        const isMatch = bcryptAdapter.compare(loginUserDto.password, password)
        if (!isMatch) throw CustomError.badRequest('email or password incorrect')

        const token = await JwtAdapter.generateToken({id: existUser.id, email: existUser.email})
        if (!token) throw CustomError.internalServer('Generating token error.')

        return {
            user: {...rest},
            token: token,
        }
    }

    private sendEmailValidationLink = async(email: string) => {
        const token = await JwtAdapter.generateToken({ email })
        if (!token) throw CustomError.internalServer('Error at generating token')

        const link = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`
        const html = `
            <h1> Validate your email </h1>
            <p> Click on the following link to validate your email </p>
            <a href="${ link }"> Validate your email: ${ email } </a>
        `;
        const options = {
            to: email,
            subject: 'Validate your email',
            htmlBody: html,
        }

        const isSent = await this.emailService.sendEmail(options)
        if (!isSent) throw CustomError.internalServer('Error at sending email.')
        return true;
    }

    public validateEmail = async (token:string) => {
        const payload = await JwtAdapter.validateToken( token )
        if (!payload) throw CustomError.unauthorized('Invalid token')

        const { email } = payload as { email:string };
        if(!email) throw CustomError.internalServer('Email not in token')

        const user = await UserModel.findOne({email})
        if(!user) throw CustomError.internalServer('email does not exists.')

        user.emailValidated = true;
        await user.save();
        return true

    }
}