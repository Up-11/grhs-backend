import { IsArray, IsNotEmpty, IsObject, IsString } from 'class-validator'

export class CreateProductDto {
	@IsObject()
	@IsNotEmpty()
	name: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
	description: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
	price: PrismaJson.MinMaxValue

	@IsObject()
	@IsNotEmpty()
	volumes: PrismaJson.MinMaxValue

	@IsObject()
	@IsNotEmpty()
	nutrition: PrismaJson.Nutrition

	@IsString()
	categoryId: string

	@IsNotEmpty()
	@IsString()
	image: string

	@IsNotEmpty()
	@IsArray()
	composition: string[]
}
