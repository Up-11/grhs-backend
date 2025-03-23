import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import type { Role } from '@prisma/client'

import { RolesGuard } from '../guards/roles.guard'

export function Auth(...roles: Role[]) {
	return applyDecorators(
		SetMetadata('roles', roles),
		UseGuards(AuthGuard, RolesGuard)
	)
}
