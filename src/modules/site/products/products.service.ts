import { BadRequestException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
	constructor(private readonly database: DatabaseService) {}

	public async getProducts() {
		return this.database.product.findMany({
			include: {
				category: true
			}
		})
	}

	public async deleteProductById(productId: string) {
		return this.database.product.delete({
			where: {
				id: productId
			}
		})
	}

	public async createProduct(product: CreateProductDto) {
		const category = await this.database.category.findFirst({
			where: {
				id: product.categoryId
			}
		})

		if (!category) {
			throw new BadRequestException('Категория не найдена')
		}

		const newProduct = await this.database.product.create({
			data: {
				...product
			}
		})

		return newProduct
	}

	public async updateProduct(productId: string, dto: UpdateProductDto) {
		return this.database.product.update({
			where: {
				id: productId
			},
			data: {
				...dto
			}
		})
	}

	public async getCategories() {
		return this.database.category.findMany({
			include: {
				products: true
			},
			orderBy: {
				id: 'asc'
			}
		})
	}

	public async deleteCategoryById(categoryId: string) {
		return this.database.category.delete({
			where: {
				id: categoryId
			}
		})
	}

	public async createCategory(category: CreateCategoryDto) {
		return this.database.category.create({
			data: {
				...category
			}
		})
	}

	public async updateCategory(dto: UpdateCategoryDto, categoryId: string) {
		return this.database.category.update({
			where: {
				id: categoryId
			},
			data: {
				title: dto.title,
				hrefId: dto.hrefId
			}
		})
	}

	public async ChangeCategory(categoryId: string, productId: string) {
		return this.database.category.update({
			where: {
				id: categoryId
			},
			data: {
				products: {
					connect: {
						id: productId
					}
				}
			}
		})
	}
}
