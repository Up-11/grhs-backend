export interface ILoginResponse {
	authData?:
		| {
				user: {
					id: string
					email: string
				}
				accessToken: string
		  }
		| undefined
	emailData?:
		| {
				message: string
				success: boolean
		  }
		| undefined
}
