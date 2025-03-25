import { TokenType, User } from '@prisma/client'
import { DatabaseService } from 'src/core/database/database.service'
import { v4 as uuidv4 } from 'uuid'

import { TokenFormat } from '../types'

export function createSixDigitToken() {
	return Math.floor(Math.random() * (1000000 - 100000) + 100000).toString()
}

export async function generateToken(
	database: DatabaseService,
	user: User,
	type: TokenType,
	format: TokenFormat = 'six'
) {
	let token: string

	if (format === 'uuid') {
		token = uuidv4()
	} else {
		token = createSixDigitToken()
	}

	const expiresIn = new Date(new Date().getTime() + 300000)

	const existingToken = await database.token.findFirst({
		where: {
			type,
			user: {
				id: user.id
			}
		}
	})

	if (existingToken) {
		await database.token.delete({
			where: {
				id: existingToken.id
			}
		})
	}

	const newToken = await database.token.create({
		data: {
			token,
			expiresIn,
			type,
			user: {
				connect: {
					id: user.id
				}
			}
		},
		include: {
			user: true
		}
	})

	return newToken
}
