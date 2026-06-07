import { Button, Container, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'

import Link from '@components/atoms/link'
import Footer from '@components/layouts/footer'
import Header from '@components/layouts/header'
import { userMe } from '@libs/repo/users'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
	title: '404 Creativeans',
}

export default async function NotFound() {
	const authUser = await userMe()

	return (
		<div className="site">
			<Header data={authUser.code === 'success' ? authUser.data : undefined} />
			<main className="site-main">
				<Container
					size="xs"
					py={{
						base: 'xl',
						md: 80,
					}}
				>
					<Stack
						align="center"
						gap="lg"
					>
						<Stack
							gap="xs"
							align="center"
							ta="center"
						>
							<Title>Something is not right...</Title>
							<Text>
								Unfortunately, this is only a 404 page. You may have mistyped the
								address, or the page has been moved to another URL.
							</Text>
						</Stack>
						<Button
							component={Link}
							href="/"
						>
							Return to homepage
						</Button>
					</Stack>
				</Container>
			</main>
			<Footer />
		</div>
	)
}
