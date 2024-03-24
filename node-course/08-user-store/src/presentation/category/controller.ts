import { Request, Response } from 'express';
import { CustomError, RegisterUserDto } from '../../domain';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';


export class CategoryController {

    constructor(
    ){}

    private handleError = (error: unknown, res: Response) => {
        if (error instanceof CustomError) {
            return res.status(error.statusCode).json({error: error.message})
        }
        console.log(`${error}`)
        return res.status(500).json( {error: 'Internal server error'})
    }

    createCategory = async(req: Request, res: Response) => {
        const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
        if (error) return res.status(400).json({ error: 'Bad request'})
        res.json(createCategoryDto)
    }

    getCategories = async(req: Request, res: Response) => {
        res.json('Get categories')
    }
}