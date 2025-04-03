import { Transform } from 'class-transformer'
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
	@Transform(({ value }) => new Date(value))
	date: Date

	@IsNotEmpty()
	@IsString()
	image: string

	@IsNotEmpty()
	content: PrismaJson.EventContent
}

export class UpdateEventDto {
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
	@Transform(({ value }) => new Date(value))
	date?: Date

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	image?: string

	@IsOptional()
	@IsNotEmpty()
	@IsString()
	imagePreview?: string

	@IsOptional()
	content: PrismaJson.EventContent
}
