import { JwtAdapter, bcryptAdapter } from '../../config';
import { UserModel } from '../../data';
import { CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';




export class AuthService {
    constructor(){}

    public async registerUser( registerUserDto: RegisterUserDto){
        const existUser = await UserModel.findOne({ email: registerUserDto.email})
        if (existUser) throw CustomError.badRequest('email already exists')

        try {
            
            const user = new UserModel(registerUserDto);
            
            //Pass encryption
            user.password = bcryptAdapter.hash( registerUserDto.password)

            
            await user.save();
            //JWT <- user auth


            // Confirmation Email

            const { password, ...rest } = UserEntity.fromObject(user);

            return{
                user: {...rest},
                token: 'ABC'
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
}