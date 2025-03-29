import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

import { CreateEventDto, UpdateEventDto } from './dto/events.dto'

@Injectable()
export class EventsService {
	constructor(private readonly database: DatabaseService) {}

	public async getEvents() {
		return this.database.event.findMany()
	}
	public async getEventById(eventId: string) {
		return this.database.event.findUnique({ where: { id: eventId } })
	}
	public async createEvent(event: CreateEventDto) {
		return this.database.event.create({ data: event })
	}
	public async updateEvent(eventId: string, event: UpdateEventDto) {
		return this.database.event.update({ where: { id: eventId }, data: event })
	}
	public async deleteEvent(eventId: string) {
		return this.database.event.delete({ where: { id: eventId } })
	}
}
