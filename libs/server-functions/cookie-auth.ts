'use server'
import { cookies } from 'next/headers'

export async function storeTokenAuth(jwtToken: string) {
	const cookieStore = await cookies()

	cookieStore.set(process.env.COOKIE_SESSION_AUTH, jwtToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 7,
	})
}

export async function removeTokenAuth() {
	const cookieStore = await cookies()

	cookieStore.delete(process.env.COOKIE_SESSION_AUTH)
}

export async function retrieveTokenAuth() {
	const cookieStore = await cookies()

	return cookieStore.get(process.env.COOKIE_SESSION_AUTH)?.value
}
