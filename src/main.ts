import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import * as path from 'path'

import { CoreModule } from './core/core.module'

async function bootstrap() {
	const app = await NestFactory.create(CoreModule)
	app.setGlobalPrefix('api')

	const config = app.get(ConfigService)

	const allowedOrigins = config.get<string>('ALLOWED_ORIGIN').split(',') || []

	app.enableCors({
		origin: '*',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true
	})

	app.useGlobalPipes(
		new ValidationPipe({
			transform: true,
			whitelist: true
		})
	)

	app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

	const port = config.get<number>('APPLICATION_PORT') || 4200

	await app.listen(port)
}
bootstrap()
