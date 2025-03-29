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

import { CreateEventDto, UpdateEventDto } from './dto/events.dto'
import { EventsService } from './events.service'

@Controller(SITE_ENDPOINTS.EVENTS.INDEX)
export class EventsController {
	constructor(private readonly eventsService: EventsService) {}

	@Get()
	@HttpCode(200)
	getEvents() {
		return this.eventsService.getEvents()
	}

	@Get(SITE_ENDPOINTS.EVENTS.GET_BY_ID)
	@HttpCode(200)
	getEventById(@Param('id') eventId: string) {
		return this.eventsService.getEventById(eventId)
	}

	@Patch(SITE_ENDPOINTS.EVENTS.UPDATE_EVENT)
	@HttpCode(200)
	updateEvent(@Param('id') eventId: string, @Body() dto: UpdateEventDto) {
		return this.eventsService.updateEvent(eventId, dto)
	}

	@Post(SITE_ENDPOINTS.EVENTS.CREATE_EVENT)
	@Auth()
	@HttpCode(200)
	createEvent(@Body() dto: CreateEventDto) {
		return this.eventsService.createEvent(dto)
	}

	@Delete(SITE_ENDPOINTS.EVENTS.DELETE_EVENT)
	@HttpCode(200)
	@Auth()
	deleteEvent(@Param('id') eventId: string) {
		return this.eventsService.deleteEvent(eventId)
	}
}
