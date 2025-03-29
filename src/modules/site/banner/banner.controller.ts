import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { SITE_ENDPOINTS } from '../config/endpoints'

import { BannerService } from './banner.service'
import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'

@Controller(SITE_ENDPOINTS.BANNER.INDEX)
export class BannerController {
	constructor(private readonly bannerService: BannerService) {}

	@Get(SITE_ENDPOINTS.BANNER.GET_BANNERS)
	@HttpCode(200)
	public async getBanners() {
		return this.bannerService.getBanners()
	}

	@Post(SITE_ENDPOINTS.BANNER.CREATE_BANNER)
	@HttpCode(200)
	@Auth()
	public async createBanner(@Body() dto: CreateBannerDto) {
		return this.bannerService.createBanner(dto)
	}

	@Patch(SITE_ENDPOINTS.BANNER.UPDATE_BANNER)
	@HttpCode(200)
	@Auth()
	public async updateBanner(@Body() dto: UpdateBannerDto) {
		return this.bannerService.updateBanner(dto)
	}

	@Patch(SITE_ENDPOINTS.BANNER.UPDATE_POSITION)
	@HttpCode(200)
	@Auth()
	public async updateBannerPosition(
		@Body() payload: { newPos: number; bannerId: string }
	) {
		return this.bannerService.updateBannerPosition(
			payload.bannerId,
			payload.newPos
		)
	}

	@Delete(SITE_ENDPOINTS.BANNER.DELETE_BANNER)
	@HttpCode(200)
	@Auth()
	public async deleteBanner(@Param('id') bannerId: string) {
		return this.bannerService.deleteBanner(bannerId)
	}
}
