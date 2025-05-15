import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { SITE_ENDPOINTS } from '../config/endpoints'

import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller(SITE_ENDPOINTS.PRODUCTS.INDEX)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get()
	@HttpCode(200)
	getAll() {
		return this.productsService.getProducts()
	}

	@Get(SITE_ENDPOINTS.CATEGORIES.INDEX)
	@HttpCode(200)
	getCategories() {
		return this.productsService.getCategories()
	}

	@Post(SITE_ENDPOINTS.PRODUCTS.CREATE_PRODUCT)
	@HttpCode(200)
	@Auth()
	createProduct(@Body() dto: CreateProductDto) {
		return this.productsService.createProduct(dto)
	}

	@Post(SITE_ENDPOINTS.CATEGORIES.CREATE_CATEGORY)
	@HttpCode(200)
	@Auth()
	createCategory(@Body() dto: CreateCategoryDto) {
		return this.productsService.createCategory(dto)
	}

	@Patch(SITE_ENDPOINTS.PRODUCTS.UPDATE_PRODUCT)
	@HttpCode(200)
	@Auth()
	updateProduct(@Param('id') productId: string, @Body() dto: UpdateProductDto) {
		return this.productsService.updateProduct(productId, dto)
	}

	@Patch(SITE_ENDPOINTS.CATEGORIES.UPDATE_CATEGORY)
	@HttpCode(200)
	@Auth()
	updateCategory(
		@Body() dto: UpdateCategoryDto,
		@Param('id') categoryId: string
	) {
		return this.productsService.updateCategory(dto, categoryId)
	}

	@Delete(SITE_ENDPOINTS.PRODUCTS.DELETE_PRODUCT)
	@HttpCode(200)
	@Auth()
	deleteProduct(@Param('id') productId: string) {
		console.log(productId)

		return this.productsService.deleteProductById(productId)
	}

	@Delete(SITE_ENDPOINTS.CATEGORIES.DELETE_CATEGORY)
	@HttpCode(200)
	@Auth()
	deleteCategory(@Param('id') categoryId: string) {
		return this.productsService.deleteCategoryById(categoryId)
	}
}
