import { ProductModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { CreateProductDto } from '../../domain/dtos/products/create-product.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';


export class ProductService {
    constructor(){
    }

    async getProducts(paginationDto: PaginationDto){


        const { page, limit } = paginationDto
        try {

            const [total, products] = await Promise.all( [
                ProductModel.countDocuments(),
                ProductModel.find()
                .skip( (page - 1) * limit)
                .limit( limit )
                .populate('user', 'name email')
                .populate('category')
            ]);

            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${ (page+1) }&limit=${limit}`,
                prev: (page - 1 > 0) ? `/api/products?page=${ (page-1) }&limit=${limit}` : null,
                products: products
            }


            
            
        } catch (error) {
            throw CustomError.internalServer(`Internal server error. ${ error }`)
        }

    }

    async createProduct( createproductDto: CreateProductDto) {

        const productExists = await ProductModel.findOne({ name: createproductDto.name })
        if ( productExists ) throw CustomError.badRequest('Product already exists.') 

        try {

            const product = new ProductModel( createproductDto )

            await product.save()

            return product;
            
        } catch (error) {
            throw CustomError.internalServer(`Internal server error. ${ error }`)
        }
    }
}