import { IsArray, IsObject, IsOptional, IsString } from 'class-validator'

export class UpdateProductDto {
	@IsObject()
	@IsOptional()
	name?: PrismaJson.TextWithLangs

	@IsObject()
	@IsOptional()
	description?: PrismaJson.TextWithLangs

	@IsObject()
	@IsOptional()
	price?: PrismaJson.MinMaxValue

	@IsObject()
	@IsOptional()
	volumes?: PrismaJson.MinMaxValue

	@IsObject()
	@IsOptional()
	nutrition: PrismaJson.Nutrition

	@IsString()
	@IsOptional()
	image?: string

	@IsArray()
	@IsOptional()
	composition?: string[]

	@IsString()
	@IsOptional()
	href?: string
}
