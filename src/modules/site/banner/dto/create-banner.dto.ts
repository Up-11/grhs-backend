import { IsNotEmpty, IsObject, IsString } from 'class-validator'

export class CreateBannerDto {
	@IsObject()
	@IsNotEmpty()
	title: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
	description: PrismaJson.TextWithLangs

	@IsObject()
	@IsNotEmpty()
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
