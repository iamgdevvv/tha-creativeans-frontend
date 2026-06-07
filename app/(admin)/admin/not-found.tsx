import { Button, Container, Stack, Text, Title } from '@mantine/core'

import Link from '@components/atoms/link'
import { generateMeta } from '@libs/utils'

export const dynamic = 'force-static'
export const revalidate = 2592000

export default function Home() {
	return (
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
						Unfortunately, this is only a 404 page. You may have mistyped the address,
						or the page has been moved to another URL.
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
	)
}

export const metadata = generateMeta({
	title: '404 Creativeans',
})
