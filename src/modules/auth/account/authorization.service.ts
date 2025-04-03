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

import { EditProfileDto, LoginDto, RegisterDto } from '../dto/authorization.dto'
import { VerificationService } from '../verification/verification.service'

import { ILoginResponse } from './auth.types'

@Injectable()
export class AuthorizationService {
	constructor(
		private readonly database: DatabaseService,
		private readonly jwtService: JwtService,
		private readonly verificationService: VerificationService
	) {}

	async login(dto: LoginDto): Promise<ILoginResponse> {
		const user = await this.validateUser(dto)

		if (!user.isEmailVerified) {
			console.log(dto)

			this.verificationService.sendVerificationEmail(user)

			return {
				emailData: {
					message: 'Аккаунт не верифицирован, проверьте почту',
					success: true
				},
				authData: undefined
			}
		}

		return {
			authData: {
				user: this.returnUserFields(user),
				accessToken: await issueAccessToken(user.id, this.jwtService)
			},
			emailData: undefined
		}
	}

	async getAllUsers() {
		return this.database.user.findMany({
			omit: {
				password: true
			}
		})
	}

	async editProfile(dto: EditProfileDto, userId: string) {
		if (dto.email) {
			const userWithSameEmail = await this.database.user.findUnique({
				where: {
					email: dto.email
				}
			})
			if (userWithSameEmail && userWithSameEmail.id !== userId) {
				throw new BadRequestException('Почта занята')
			}
		}

		return this.database.user.update({
			where: {
				id: userId
			},
			data: {
				...dto
			}
		})
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
				password: await hash(dto.password, salt),
				email: dto.email
			}
		})
		return {
			user: this.returnUserFields(newUser)
		}
	}
	async removeById(userId: string) {
		return this.database.user.delete({
			where: {
				id: userId
			}
		})
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
			email: user.email
		}
	}
}
