import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/core/database/database.service'

@Injectable()
export class EventsService {
	public constructor(private readonly database: DatabaseService) {}
}
