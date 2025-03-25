import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Post
} from '@nestjs/common'

import { SITE_ENDPOINTS } from './config/endpoints'
import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'
import { SiteService } from './site.service'

@Controller(SITE_ENDPOINTS.INDEX)
export class SiteController {
	constructor(private readonly siteService: SiteService) {}

	@Get(SITE_ENDPOINTS.BANNER.GET_BANNERS)
	@HttpCode(200)
	public async getBanners() {
		return this.siteService.getBanners()
	}

	@Post(SITE_ENDPOINTS.BANNER.CREATE_BANNER)
	@HttpCode(200)
	public async createBanner(@Body() dto: CreateBannerDto) {
		return this.siteService.createBanner(dto)
	}

	@Patch(SITE_ENDPOINTS.BANNER.UPDATE_BANNER)
	@HttpCode(200)
	public async updateBanner(
		@Body() dto: UpdateBannerDto,
		@Body() bannerId: string
	) {
		return this.siteService.updateBanner(bannerId, dto)
	}

	@Patch(SITE_ENDPOINTS.BANNER.UPDATE_POSITION)
	@HttpCode(200)
	public async updateBannerPosition(
		@Body() newPos: number,
		@Body() bannerId: string
	) {
		return this.siteService.updateBannerPosition(bannerId, newPos)
	}

	@Delete(SITE_ENDPOINTS.BANNER.DELETE_BANNER)
	@HttpCode(200)
	public async deleteBanner(@Body() bannerId: string) {
		return this.siteService.deleteBanner(bannerId)
	}
}
