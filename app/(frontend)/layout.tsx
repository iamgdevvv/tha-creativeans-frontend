import Footer from '@components/layouts/footer'
import Header from '@components/layouts/header'
import Providers from '@components/providers/providers'
import { userMe } from '@libs/repo/users'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
	const authUser = await userMe()

	return (
		<Providers>
			<div className="site">
				<Header data={authUser.code === 'success' ? authUser.data : undefined} />
				<main className="site-main">{children}</main>
				<Footer />
			</div>
		</Providers>
	)
}
