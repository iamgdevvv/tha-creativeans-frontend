import Footer from '@components/layouts/footer'
import Header from '@components/layouts/header'
import Providers from '@components/providers/providers'

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
	return (
		<Providers>
			<div className="site">
				<Header />
				<main className="site-main">{children}</main>
				<Footer />
			</div>
		</Providers>
	)
}
