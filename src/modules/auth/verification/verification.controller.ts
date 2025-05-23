import { Body, Controller, HttpCode, Post } from '@nestjs/common'

import { AUTHORIZATION_ROUTES } from '../config/authorization.routes'

import { VerificationDto } from './dto/verification.dto'
import { VerificationService } from './verification.service'

@Controller(AUTHORIZATION_ROUTES.VERIFICATION)
export class VerificationController {
	constructor(private readonly verificationService: VerificationService) {}

	@Post()
	@HttpCode(200)
	async verify(@Body() dto: VerificationDto) {
		return this.verificationService.verify(dto)
	}
}
