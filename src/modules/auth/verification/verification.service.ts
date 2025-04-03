import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { TokenType, User } from '@prisma/client'
import { DatabaseService } from 'src/core/database/database.service'
import { MailService } from 'src/modules/libs/mail/mail.service'
import { generateToken } from 'src/shared/utils/generate-token.util'
import { issueAccessToken } from 'src/shared/utils/issue-access-token.util'

import { VerificationDto } from './dto/verification.dto'

@Injectable()
export class VerificationService {
	constructor(
		private readonly database: DatabaseService,
		private readonly mailService: MailService,
		private readonly jwtService: JwtService
	) {}

	async verify(dto: VerificationDto) {
		const { token } = dto

		const existingToken = await this.database.token.findUnique({
			where: {
				token,
				type: TokenType.EMAIL_VERIFY
			}
		})

		if (!existingToken) {
			throw new NotFoundException('Токен не найден')
		}

		const hasExpired = new Date(existingToken.expiresIn) < new Date()

		if (hasExpired) {
			throw new BadRequestException('Время действия токена истекло')
		}

		const existingUser = await this.database.user.update({
			where: {
				id: existingToken.userId
			},
			data: {
				isEmailVerified: true
			}
		})

		await this.database.token.delete({
			where: {
				id: existingToken.id,
				type: TokenType.EMAIL_VERIFY
			}
		})

		return {
			message: 'Почта успешно верифицирована',
			user: existingUser,
			accessToken: await issueAccessToken(existingUser.id, this.jwtService)
		}
	}

	async sendVerificationEmail(user: User) {
		console.log(user)

		const verificationToken = await generateToken(
			this.database,
			user,
			TokenType.EMAIL_VERIFY,
			'six'
		)

		await this.mailService.sendVerificationToken(
			user.email,
			verificationToken.token
		)
		return true
	}
}
