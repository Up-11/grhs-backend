import {
	BadRequestException,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { compare, genSalt, hash } from 'bcryptjs'
import { DatabaseService } from 'src/core/database/database.service'
import { issueAccessToken } from 'src/shared/utils/issue-access-token.util'

import { LoginDto, RegisterDto } from '../dto/authorization.dto'
import { VerificationService } from '../verification/verification.service'

@Injectable()
export class AuthorizationService {
	constructor(
		private readonly database: DatabaseService,
		private readonly jwtService: JwtService,
		private readonly verificationService: VerificationService
	) {}

	async login(dto: LoginDto) {
		const user = await this.validateUser(dto)

		if (!user.isEmailVerified) {
			this.verificationService.sendVerificationEmail(user)

			throw new BadRequestException('Аккаунт не верифицирован, проверьте почту')
		}

		return {
			user: this.returnUserFields(user),
			accessToken: await issueAccessToken(user.id, this.jwtService)
		}
	}

	async create(dto: RegisterDto) {
		const oldUser = await this.database.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (oldUser) throw new BadRequestException('Почта занята')

		const salt = await genSalt(10)

		const newUser = await this.database.user.create({
			data: {
				name: dto.name,
				password: await hash(dto.password, salt),
				email: dto.email
			}
		})

		if (!newUser.isEmailVerified) {
			this.verificationService.sendVerificationEmail(newUser)

			throw new BadRequestException('Аккаунт не верифицирован, проверьте почту')
		}

		return {
			user: this.returnUserFields(newUser),
			accessToken: await issueAccessToken(newUser.id, this.jwtService)
		}
	}

	async validateUser(dto: LoginDto): Promise<User> {
		const user = await this.database.user.findUnique({
			where: {
				email: dto.email
			}
		})
		if (!user) throw new UnauthorizedException('Пользователь не найден')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Неверный пароль')

		return user
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email,
			name: user.name
		}
	}
}
