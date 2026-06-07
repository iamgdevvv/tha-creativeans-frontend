import { redirect } from 'next/navigation'

import Footer from '@components/layouts/footer'
import Providers from '@components/providers/providers'
import { userMe } from '@libs/repo/users'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const authUser = await userMe()

	if (authUser.code === 'success') {
		if (['ADMIN', 'STAFF'].includes(authUser.data.role)) {
			redirect('/admin')
		} else {
			redirect('/dashboard')
		}
	}

	return (
		<Providers>
			<div className="site">
				<main className="site-main">{children}</main>
				<Footer />
			</div>
		</Providers>
	)
}
