import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { AuthorizationModule } from 'src/modules/auth/account/authorization.module'
import { VerificationModule } from 'src/modules/auth/verification/verification.module'
import { MailModule } from 'src/modules/libs/mail/mail.module'
import { IS_DEV } from 'src/shared/utils/is-dev'

import { DatabaseModule } from './database/database.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			ignoreEnvFile: !IS_DEV
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'static')
		}),
		AuthorizationModule,
		DatabaseModule,
		VerificationModule,
		MailModule
	]
})
export class CoreModule {}
