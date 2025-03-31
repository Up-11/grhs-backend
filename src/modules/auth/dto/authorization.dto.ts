import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class RegisterDto {
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Пароль должен быть не меньше 8 символов'
	})
	@IsString()
	password: string
}

export class LoginDto {
	@IsEmail()
	email: string

	@MinLength(8, {
		message: 'Пароль должен быть не меньше 8 символов'
	})
	@IsString()
	password: string
}

export class EditProfileDto {
	@IsEmail()
	@IsOptional()
	email: string

	@MinLength(8, {
		message: 'Пароль должен быть не меньше 8 символов'
	})
	@IsString()
	@IsOptional()
	password: string
}
