import { NextRequest, NextResponse } from 'next/server'

import { storeRedirectOauthLogin } from '@libs/server-functions/cookies'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const url = new URL(request.url)

	const redirectUrl = url.searchParams.get('redirectUrl')

	if (redirectUrl) {
		await storeRedirectOauthLogin(redirectUrl)
	}

	return NextResponse.redirect(
		new URL(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login/google'),
		{ status: 307 },
	)
}
