import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'

import { AUTHORIZATION_ROUTES } from '../config/authorization.routes'
import { LoginDto, RegisterDto } from '../dto/authorization.dto'

import { AuthorizationService } from './authorization.service'

@Controller(AUTHORIZATION_ROUTES.INDEX)
export class AuthorizationController {
	constructor(private readonly authorizationService: AuthorizationService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(AUTHORIZATION_ROUTES.SIGN_IN)
	async login(@Body() dto: LoginDto) {
		return this.authorizationService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post(AUTHORIZATION_ROUTES.SIGN_UP)
	async register(@Body() dto: RegisterDto) {
		return this.authorizationService.create(dto)
	}
}
