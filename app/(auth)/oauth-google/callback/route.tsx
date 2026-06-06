import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
	const url = new URL(request.url)

	const redirectUrl = url.origin + '/oauth-google/login'
	const errorRedirectUrl = url.origin + '/login'

	const oauthCallbackUrl = new URL(process.env.NEXT_PUBLIC_API_URL + '/api/auth/oauth/google')

	oauthCallbackUrl.search = request.url.split('?')[1]
	oauthCallbackUrl.searchParams.set('redirectUrl', redirectUrl)
	oauthCallbackUrl.searchParams.set('errorRedirectUrl', errorRedirectUrl)

	console.log('oauthCallbackUrl', oauthCallbackUrl)

	return NextResponse.redirect(oauthCallbackUrl, { status: 307 })
}
