import { Box, Container, Flex } from '@mantine/core'
import { redirect } from 'next/navigation'

import Footer from '@components/layouts/footer'
import Header from '@components/layouts/header'
import SidebarDashboard from '@components/layouts/sidebar-dashboard'
import { userMe } from '@libs/repo/users'
import { generateMeta } from '@libs/utils'

export const metadata = generateMeta({
	title: {
		default: 'Dashboard Creativeans',
		template: '%s | Dashboard Creativeans',
	},
	robots: 'noindex, nofollow',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const authUser = await userMe()

	if (authUser.code === 'error') {
		redirect('/auth/login')
	}

	return (
		<div className="site">
			<Header data={authUser.data} />
			<Flex
				bg="gray.1"
				component="main"
				py="xl"
				className="site-main"
			>
				<Container>
					<Flex
						h={{
							md: '100%',
						}}
						wrap="wrap"
						gap={{
							base: 'lg',
							md: 0,
						}}
					>
						<SidebarDashboard
							auth={authUser.data}
							w={{
								base: '100%',
								md: '33.333%',
								lg: 300,
							}}
							p="lg"
							bg="white"
							bdrs="md"
						/>
						<Box
							w={{
								base: '100%',
								md: '66.666%',
								lg: 'calc(100% - 300px)',
							}}
							pl={{
								md: 'xl',
							}}
						>
							<Box
								h="100%"
								p={{
									base: 'lg',
									lg: 'xl',
								}}
								bg="white"
								bdrs="md"
							>
								{children}
							</Box>
						</Box>
					</Flex>
				</Container>
			</Flex>
			<Footer />
		</div>
	)
}
