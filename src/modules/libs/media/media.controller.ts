import {
	Controller,
	HttpCode,
	Post,
	Query,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Auth } from 'src/shared/decorators/auth.decorator'

import { File } from './media.interface'
import { MediaService } from './media.service'

@Controller('media')
export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	@HttpCode(200)
	@Auth()
	@Post()
	@UseInterceptors(FileInterceptor('media'))
	async uploadMediaFile(
		@UploadedFile() mediaFile: File,
		@Query('folder') folder?: string
	) {
		return this.mediaService.saveMedia(mediaFile, folder)
	}
}
