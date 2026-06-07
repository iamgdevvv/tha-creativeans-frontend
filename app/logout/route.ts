import { NextRequest, NextResponse } from 'next/server'

import { removeTokenAuth } from '@libs/server-functions/cookies'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	await removeTokenAuth()

	const url = new URL(request.url)
	const redirectUrl = url.searchParams.get('redirectUrl') || '/login'

	return NextResponse.redirect(new URL(redirectUrl, request.url), { status: 307 })
}
