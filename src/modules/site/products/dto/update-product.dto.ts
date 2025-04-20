import { IsObject, IsOptional, IsString } from 'class-validator'

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

	@IsOptional()
	@IsString()
	categoryId: string

	@IsString()
	@IsOptional()
	image?: string

	@IsObject()
	@IsOptional()
	composition?: PrismaJson.TextWithLangs
}
