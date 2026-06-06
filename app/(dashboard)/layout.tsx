import { Box, ColorSchemeScript, Container, Flex, mantineHtmlProps } from '@mantine/core'
import { Plus_Jakarta_Sans } from 'next/font/google'
import { redirect } from 'next/navigation'

import Footer from '@components/layouts/footer'
import HeaderAdmin from '@components/layouts/header-admin'
import SidebarAdmin from '@components/layouts/sidebar-admin'
import Providers from '@components/providers/providers'
import { userMe } from '@libs/repo/users'
import { generateMeta } from '@libs/utils'

import '@mantine/carousel/styles.css'
import '@mantine/dropzone/styles.css'

import '@styles/mantine.css'

import '@styles/globals.css'

const fontBody = Plus_Jakarta_Sans({
	display: 'swap',
	variable: '--font-sans',
	preload: true,
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin', 'latin-ext', 'cyrillic-ext', 'vietnamese'],
	fallback: [
		'ui-sans-serif',
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'Helvetica Neue',
		'Arial',
		'Noto Sans',
		'sans-serif',
		'Apple Color Emoji, Segoe UI Emoji',
		'Segoe UI Symbol',
		'Noto Color Emoji',
	],
})

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
		redirect('/login')
	}

	return (
		<html
			lang="nl-NL"
			{...mantineHtmlProps}
			data-scroll-behavior="smooth"
			className={fontBody.className}
			style={{
				['--font-sans' as string]: fontBody.style.fontFamily,
			}}
		>
			<head>
				<ColorSchemeScript
					defaultColorScheme="light"
					forceColorScheme="light"
				/>
			</head>
			<body>
				<Providers>
					<div className="site">
						<HeaderAdmin data={authUser.data} />
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
									<SidebarAdmin
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
				</Providers>
			</body>
		</html>
	)
}
