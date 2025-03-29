import {
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString,
	IsUUID
} from 'class-validator'

export class UpdateBannerDto {
	@IsOptional()
	@IsNotEmpty()
	@IsObject()
	title?: PrismaJson.TextWithLangs

	@IsUUID()
	@IsString()
	id: string

	@IsOptional()
	@IsNotEmpty()
	@IsObject()
	description?: PrismaJson.TextWithLangs

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
