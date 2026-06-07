import { Button, Container, Divider, Paper, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'
import { TbBrandGoogle } from 'react-icons/tb'

import Link from '@components/atoms/link'
import FormLogin from '@components/layouts/form-login'

export const metadata: Metadata = {
	title: 'Sign in',
}

export const dynamic = 'force-dynamic'

type PageProps = {
	searchParams: Promise<{ redirectUrl?: string }>
}

export default async function Login({ searchParams }: PageProps) {
	const { redirectUrl } = await searchParams

	return (
		<Container
			size="xs"
			py={{
				base: 'xl',
				md: 80,
			}}
		>
			<Stack
				gap="xs"
				align="center"
				ta="center"
			>
				<Title>Welcome back!</Title>
				<Text>
					Do not have an account yet?{' '}
					<Link
						href="/admin/register"
						underline="always"
					>
						Create account
					</Link>
				</Text>
			</Stack>
			<Paper
				withBorder
				shadow="sm"
				p={{
					base: 'lg',
					md: 'xl',
				}}
				mt="xl"
				radius="lg"
			>
				<FormLogin redirectUrl={redirectUrl} />
				<Divider my="xl" />
				<Button
					component={Link}
					href={`/auth/login/google?${redirectUrl ? `redirectUrl=${redirectUrl}` : ''}`}
					variant="light"
					fullWidth
					radius="md"
					leftSection={<TbBrandGoogle size={20} />}
				>
					Sign in with Google
				</Button>
			</Paper>
		</Container>
	)
}
