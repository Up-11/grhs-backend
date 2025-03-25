import { ConfigService } from '@nestjs/config'
import { JwtModuleOptions } from '@nestjs/jwt'

export const getJWTConfig = async (
	ConfigService: ConfigService
): Promise<JwtModuleOptions> => ({
	secret: ConfigService.getOrThrow<string>('JWT_SECRET')
})
