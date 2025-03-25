import { JwtService } from '@nestjs/jwt'

export async function issueAccessToken(userId: string, jwtService: JwtService) {
	const data = { id: userId }

	const accessToken = await jwtService.signAsync(data, {
		expiresIn: '31d'
	})

	return accessToken
}
