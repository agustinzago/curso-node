import { NextFunction, Request, Response } from 'express';


export class AuthMiddleware {

    static async validateJWT(req: Request, res: Response, next: NextFunction) {
        const authorization = req.header('Authorization');
        if ( !authorization ) return res.status(401).json({ error: 'No token provided' })
        if (!authorization.startsWith('Bearer ')) return res.status(401).json({error: 'Invalid bearer token'})

        const token = authorization.split(' ').at(1) || '';

        try {
            
        } catch (error) {

            console.log(error);
            res.status(500).json({ error: 'Internal server error' })
            
        }
    }
}