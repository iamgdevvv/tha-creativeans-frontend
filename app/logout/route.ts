import { NextRequest, NextResponse } from 'next/server'

import { removeTokenAuth } from '@libs/server-functions/cookie-auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	await removeTokenAuth()

	return NextResponse.redirect(new URL('/login', request.url), { status: 307 })
}
