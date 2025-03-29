import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsObject()
	@IsNotEmpty()
	title: PrismaJson.TextWithLangs

	@IsString()
	@IsNotEmpty()
	hrefId: string
}

export class UpdateCategoryDto {
	@IsObject()
	@IsOptional()
	title?: PrismaJson.TextWithLangs

	@IsString()
	@IsOptional()
	hrefId?: string
}
