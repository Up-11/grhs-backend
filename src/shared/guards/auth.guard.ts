import { AuthGuard as AuthGuardJwt } from '@nestjs/passport'

export class AuthGuard extends AuthGuardJwt('jwt') {}
