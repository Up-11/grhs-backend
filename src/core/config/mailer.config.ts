import type { MailerOptions } from '@nestjs-modules/mailer'
import { ConfigService } from '@nestjs/config'

export function getMailerConfig(configService: ConfigService): MailerOptions {
	const config = {
		transport: {
			host: configService.getOrThrow<string>('MAIL_HOST'),
			port: parseInt(configService.getOrThrow<string>('MAIL_PORT')),
			secure: true,
			auth: {
				user: configService.getOrThrow<string>('MAIL_LOGIN'),
				pass: configService.getOrThrow<string>('MAIL_PASSWORD')
			},
			logger: true,
			debug: true
		},
		tls: {
			rejectUnauthorized: false
		},
		connectionTimeout: 30000,
		defaults: {
			from: `"Green House Support" <${configService.getOrThrow<string>('MAIL_LOGIN')}>`
		}
	}

	console.log('Mailer Config:', {
		host: config.transport.host,
		port: config.transport.port,
		secure: config.transport.secure,
		user: config.transport.auth.user,
		pass: config.transport.auth.pass ? '***' : 'undefined'
	})

	return config
}
