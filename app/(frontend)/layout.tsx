import Footer from '@components/layouts/footer'
import Header from '@components/layouts/header'
import { userMe } from '@libs/repo/users'

export const dynamic = 'force-dynamic'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
	const authUser = await userMe()

	return (
		<div className="site">
			<Header data={authUser.code === 'success' ? authUser.data : undefined} />
			<main className="site-main">{children}</main>
			<Footer />
		</div>
	)
}
