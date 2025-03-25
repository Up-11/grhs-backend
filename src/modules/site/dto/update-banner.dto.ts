import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator'

export class UpdateBannerDto {
	@IsOptional()
	@IsObject()
	@IsNotEmpty()
	@IsObject()
	title?: PrismaJson.TextWithLangs

	@IsOptional()
	@IsObject()
	@IsNotEmpty()
	@IsObject()
	description?: PrismaJson.TextWithLangs

	@IsObject()
	@IsOptional()
	@IsNotEmpty()
	@IsObject()
	button?: PrismaJson.TextWithLangs

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	image?: string

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	imageSide?: PrismaJson.ImageSide

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	href?: string
}
