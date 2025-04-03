import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { AUTHORIZATION_ROUTES } from '../config/authorization.routes'
import { EditProfileDto, LoginDto, RegisterDto } from '../dto/authorization.dto'

import { AuthorizationService } from './authorization.service'

@Controller(AUTHORIZATION_ROUTES.INDEX)
export class AuthorizationController {
	constructor(private readonly authorizationService: AuthorizationService) {}

	@HttpCode(200)
	@Post(AUTHORIZATION_ROUTES.SIGN_IN)
	async login(@Body() dto: LoginDto) {
		return this.authorizationService.login(dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post(AUTHORIZATION_ROUTES.SIGN_UP)
	async register(@Body() dto: RegisterDto) {
		return this.authorizationService.create(dto)
	}

	@HttpCode(200)
	@Auth()
	@Get()
	async getAll() {
		return this.authorizationService.getAllUsers()
	}

	@Auth()
	@HttpCode(200)
	@Delete('/delete/:id')
	async deleteById(@Param('id') userId: string) {
		return this.authorizationService.removeById(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Patch(AUTHORIZATION_ROUTES.EDIT)
	async editProfile(@Body() dto: EditProfileDto, @Param('id') userId: string) {
		return this.authorizationService.editProfile(dto, userId)
	}
}
