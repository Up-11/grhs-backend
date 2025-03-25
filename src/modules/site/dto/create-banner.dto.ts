import { IsNotEmpty, IsObject, IsString } from 'class-validator'

export class CreateBannerDto {
	@IsObject()
	@IsNotEmpty()
	@IsObject()
	title: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
	@IsObject()
	description: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
	@IsObject()
	button: PrismaJson.TextWithLangs

	@IsNotEmpty()
	@IsString()
	image: string

	@IsNotEmpty()
	@IsString()
	imageSide: PrismaJson.ImageSide

	@IsNotEmpty()
	@IsString()
	href: string
}
