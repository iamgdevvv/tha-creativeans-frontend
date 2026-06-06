import { NextRequest, NextResponse } from 'next/server'

export async function proxy(request: NextRequest) {
	const { pathname, search } = request.nextUrl

	// check if the requested path is a valid url
	// bot attach via query injection
	try {
		// decode sekali
		const once = decodeURIComponent(pathname)

		// decode dua kali (karena payload sering double-encoded)
		decodeURIComponent(once)
	} catch {
		return NextResponse.redirect(new URL('/404', request.url))
	}

	const response = NextResponse.next()

	const host = request.headers.get('host')

	const protocol = request.headers.get('x-forwarded-proto') || 'https'

	response.headers.set('x-original-url', `${protocol}://${host}` + pathname + search)

	return response
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
		 */
		'/((?!api/media|api/asset/file|_next/static|_next/image|fonts|blocks|favicon.png|favicon.ico|sitemap.xml|robots.txt).*)',
	],
}
