import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import { CreateBannerDto } from './dto/create-banner.dto'
import { UpdateBannerDto } from './dto/update-banner.dto'

@Injectable()
export class BannerService {
	constructor(private readonly database: DatabaseService) {}

	public async getBanners() {
		return this.database.banner.findMany()
	}
	public async createBanner(dto: CreateBannerDto) {
		const lastBanner = await this.database.banner.findFirst({
			orderBy: { position: 'desc' }
		})

		const newPosition = lastBanner ? lastBanner.position + 1 : 1
		return this.database.banner.create({
			data: {
				...dto,
				position: newPosition
			}
		})
	}

	public async updateBannerPosition(bannerId: string, newPosition: number) {
		return this.database.banner.update({
			where: { id: bannerId },
			data: { position: newPosition }
		})
	}
	public async updateBanner(dto: UpdateBannerDto) {
		return this.database.banner.update({ where: { id: dto.id }, data: dto })
	}
	public async deleteBanner(bannerId: string) {
		return this.database.banner.delete({ where: { id: bannerId } })
	}
}
