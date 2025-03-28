import { Module } from '@nestjs/common'

import { ProductsModule } from '../products/products.module'

import { BannerController } from './banner.controller'
import { BannerService } from './banner.service'

@Module({
	controllers: [BannerController],
	providers: [BannerService],
	imports: [ProductsModule]
})
export class BannerModule {}
