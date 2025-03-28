import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Patch,
	Post
} from '@nestjs/common'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { SITE_ENDPOINTS } from '../config/endpoints'
import { CreateBannerDto } from '../dto/create-banner.dto'
import { UpdateBannerDto } from '../dto/update-banner.dto'

import { BannerService } from './banner.service'

@Controller(SITE_ENDPOINTS.INDEX)
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
	public async updateBanner(
		@Body() dto: UpdateBannerDto,
		@Body() bannerId: string
	) {
		return this.bannerService.updateBanner(bannerId, dto)
	}

	@Patch(SITE_ENDPOINTS.BANNER.UPDATE_POSITION)
	@HttpCode(200)
	@Auth()
	public async updateBannerPosition(
		@Body() newPos: number,
		@Body() bannerId: string
	) {
		return this.bannerService.updateBannerPosition(bannerId, newPos)
	}

	@Delete(SITE_ENDPOINTS.BANNER.DELETE_BANNER)
	@HttpCode(200)
	@Auth()
	public async deleteBanner(@Body() bannerId: string) {
		return this.bannerService.deleteBanner(bannerId)
	}
}
