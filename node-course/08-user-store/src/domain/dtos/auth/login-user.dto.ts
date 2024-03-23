import { regularExps } from '../../../config';


export class LoginUserDto {

    constructor(
        public readonly email: string,
        public readonly password: string,
    ){}

    public static create( object: {[key:string]: any}): [string?, LoginUserDto?] {
        const {email, password} = object
        if (!password) return ['Password is missing', undefined]
        if (!email) return ['email is missing', undefined]
        if ( !regularExps.email.test(email) ) return [' is not valid', undefined];
        if ( password.length < 6 ) return ['Password is too short', undefined];

        return [undefined, new LoginUserDto( email, password)]
        
    }
}