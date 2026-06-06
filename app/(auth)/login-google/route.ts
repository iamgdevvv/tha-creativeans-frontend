import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
	return NextResponse.redirect(
		new URL(process.env.NEXT_PUBLIC_API_URL + '/api/auth/login/google'),
		{ status: 307 },
	)
}
