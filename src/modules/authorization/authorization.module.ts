import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'

import { AuthorizationController } from './authorization.controller'
import { AuthorizationService } from './authorization.service'
import { getJWTConfig } from './config/jwt.config'
import { JwtStrategy } from './strategies/jwt.strategy'

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJWTConfig
		})
	],
	controllers: [AuthorizationController],
	providers: [AuthorizationService, JwtStrategy]
})
export class AuthorizationModule {}
