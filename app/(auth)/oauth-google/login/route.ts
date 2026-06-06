import { NextRequest, NextResponse } from 'next/server'

import { storeTokenAuth } from '@libs/server-functions/cookie-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const url = new URL(request.url)
	const token = url.searchParams.get('token')

	if (!token) {
		return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
	}

	await storeTokenAuth(token)

	return NextResponse.redirect(new URL('/admin', request.url), { status: 307 })
}
