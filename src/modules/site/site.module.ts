import { Module } from '@nestjs/common';
import { SiteService } from './site.service';
import { SiteController } from './site.controller';
import { ProductsModule } from './products/products.module';

@Module({
  controllers: [SiteController],
  providers: [SiteService],
  imports: [ProductsModule],
})
export class SiteModule {}
