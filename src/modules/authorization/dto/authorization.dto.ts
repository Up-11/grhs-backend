import { Role } from '@prisma/client'
import {
	IsEmail,
	IsEnum,
	IsOptional,
	IsString,
	MinLength
} from 'class-validator'

export class RegisterDto {
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Пароль должен быть не меньше 4 символов'
	})
	@IsString()
	password: string

	@IsString()
	@MinLength(2, {
		message: 'Имя должно быть не меньше 2 символов'
	})
	name: string

	@IsEnum(Role)
	@IsOptional()
	role: Role
}

export class LoginDto {
	@IsEmail()
	email: string

	@MinLength(4, {
		message: 'Пароль должен быть не меньше 4 символов'
	})
	@IsString()
	password: string

	@IsString()
	@MinLength(3, {
		message: 'Имя должно быть не меньше 3 символов'
	})
	name: string
}
