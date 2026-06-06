'use server'

import type { AuthLogin, AuthRegister } from '@libs/schema/auth'
import { mutateBackend } from '@libs/server-functions/backend-api'
import { storeTokenAuth } from '@libs/server-functions/cookie-auth'

export async function authLogin(payload: AuthLogin) {
	const result = await mutateBackend<
		User,
		AuthLogin,
		{
			token: string
		}
	>('/api/auth/login', payload)

	if (result.code === 'error') {
		return result
	}

	const { token, ...response } = result

	await storeTokenAuth(token)

	return response
}

export async function authRegister(payload: AuthRegister) {
	return await mutateBackend<User, AuthRegister>('/api/auth/register', payload)
}
