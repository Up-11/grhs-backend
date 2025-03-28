import {
	IsDate,
	IsNotEmpty,
	IsObject,
	IsOptional,
	IsString
} from 'class-validator'

export class CreateEventDto {
	@IsNotEmpty()
	@IsObject()
	name: PrismaJson.TextWithLangs

	@IsNotEmpty()
	@IsObject()
	description: PrismaJson.TextWithLangs

	@IsDate()
	@IsNotEmpty()
	date: Date

	@IsNotEmpty()
	@IsString()
	image: string

	@IsNotEmpty()
	@IsString()
	imagePreview: string
}

export class EditEventDto {
	@IsNotEmpty()
	@IsObject()
	@IsOptional()
	name?: PrismaJson.TextWithLangs

	@IsOptional()
	@IsNotEmpty()
	@IsObject()
	description?: PrismaJson.TextWithLangs

	@IsOptional()
	@IsDate()
	@IsNotEmpty()
	date?: Date

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	image?: string

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	imagePreview?: string
}
