'use server'
import { redirect } from 'next/navigation'

import type { AuthLogin, AuthRegister } from '@libs/schema/auth'
import {
	fetchBackend,
	mutateBackend,
	type ResponseBackendData,
} from '@libs/server-functions/backend-api'
import { storeTokenAuth } from '@libs/server-functions/cookies'

export async function authLogin(payload: AuthLogin, redirectUrl?: string) {
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

	if (redirectUrl) {
		redirect(redirectUrl)
	}

	return response
}

export async function authRegister(payload: AuthRegister) {
	return await mutateBackend<User, AuthRegister>('/api/auth/register', payload)
}

export async function authOauthGoogle(params: string) {
	const result = await fetchBackend<
		ResponseBackendData<User> & {
			token: string
		}
	>('/api/auth/oauth/google?' + params)

	if (result.code === 'error') {
		return result
	}

	const { token, ...response } = result

	await storeTokenAuth(token)

	return response
}
