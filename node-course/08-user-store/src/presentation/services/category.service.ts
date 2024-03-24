import { CategoryModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';


export class CategoryService {
    constructor(){
    }

    async getCategories(paginationDto: PaginationDto){


        const { page, limit } = paginationDto
        try {
            const categories = await CategoryModel.find()
                .skip( (page - 1) * limit)
                .limit( limit )

            const mappedCategories = categories.map((category) => ({
                id: category.id,
                name: category.name,
                available: category.available
            }))
            return [mappedCategories]
            
        } catch (error) {
            throw CustomError.internalServer(`Internal server error. ${ error }`)
        }

    }

    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity) {

        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name })
        if ( categoryExists ) throw CustomError.badRequest(' Category already exists.') 

        try {

            const category = new CategoryModel({
                ...CreateCategoryDto,
                user: user.id,
            })

            await category.save()

            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }
            
        } catch (error) {
            throw CustomError.internalServer(`Internal server error. ${ error }`)
        }
    }
}