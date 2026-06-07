import { NextRequest, NextResponse } from 'next/server'

import { removeTokenAuth } from '@libs/server-functions/cookie-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	await removeTokenAuth()

	const url = new URL(request.url)
	const redirect = url.searchParams.get('redirect') || '/login'

	return NextResponse.redirect(new URL(redirect, request.url), { status: 307 })
}
