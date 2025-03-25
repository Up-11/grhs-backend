import { IsNotEmpty, IsString } from 'class-validator'

export class VerificationDto {
	@IsNotEmpty()
	@IsString()
	token: string
}
