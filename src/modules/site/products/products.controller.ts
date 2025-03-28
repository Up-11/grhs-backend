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

import { SITE_ENDPOINTS } from '../config/endpoints'

import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@Controller(SITE_ENDPOINTS.PRODUCTS.INDEX)
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Get(SITE_ENDPOINTS.PRODUCTS.INDEX)
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
	createProduct(@Body() dto: CreateProductDto) {
		return this.productsService.createProduct(dto)
	}

	@Post(SITE_ENDPOINTS.CATEGORIES.CREATE_CATEGORY)
	@HttpCode(200)
	createCategory(@Body() dto: CreateCategoryDto) {
		return this.productsService.createCategory(dto)
	}

	@Post(SITE_ENDPOINTS.CATEGORIES.CREATE_CATEGORY)
	@HttpCode(200)
	changeCategory(
		@Param('categoryId') categoryId: string,
		@Param('productId') productId: string
	) {
		return this.productsService.ChangeCategory(categoryId, productId)
	}

	@Patch(SITE_ENDPOINTS.PRODUCTS.UPDATE_PRODUCT)
	@HttpCode(200)
	updateProduct(
		@Param('productId') productId: string,
		@Body() dto: UpdateProductDto
	) {
		return this.productsService.updateProduct(productId, dto)
	}

	@Patch(SITE_ENDPOINTS.CATEGORIES.UPDATE_CATEGORY)
	@HttpCode(200)
	updateCategory(
		@Body() dto: UpdateCategoryDto,
		@Param('categoryId') categoryId: string
	) {
		return this.productsService.updateCategory(dto, categoryId)
	}

	@Delete(SITE_ENDPOINTS.PRODUCTS.DELETE_PRODUCT)
	@HttpCode(200)
	deleteProduct(@Param('productId') productId: string) {
		return this.productsService.deleteProductById(productId)
	}

	@Delete(SITE_ENDPOINTS.CATEGORIES.INDEX)
	@HttpCode(200)
	deleteCategory(@Param('categoryId') categoryId: string) {
		return this.productsService.deleteCategoryById(categoryId)
	}
}
