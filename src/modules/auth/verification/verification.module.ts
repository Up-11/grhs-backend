import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { getJWTConfig } from '../config/jwt.config'

import { VerificationController } from './verification.controller'
import { VerificationService } from './verification.service'

@Module({
	imports: [
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	],
	controllers: [VerificationController],
	providers: [VerificationService]
})
export class VerificationModule {}
