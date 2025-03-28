import { IsNotEmpty, IsObject, IsOptional } from 'class-validator'

export class CreateCategoryDto {
	@IsObject()
	@IsNotEmpty()
	title: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
	hrefId: string
}

export class UpdateCategoryDto {
	@IsObject()
	@IsOptional()
	title?: PrismaJson.TextWithLangs

	@IsObject()
	@IsOptional()
	hrefId?: string
}
