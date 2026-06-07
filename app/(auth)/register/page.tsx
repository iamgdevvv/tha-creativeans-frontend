import { Button, Container, Divider, Paper, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'
import { TbBrandGoogle } from 'react-icons/tb'

import Link from '@components/atoms/link'
import FormRegister from '@components/layouts/form-register'

export const metadata: Metadata = {
	title: 'Sign up',
}

export const dynamic = 'force-dynamic'

export default function Register() {
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
				<Title>Create an account</Title>
				<Text>
					Already have an account?{' '}
					<Link
						href="/admin/login"
						underline="always"
					>
						Login
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
				<FormRegister />
				<Divider my="xl" />
				<Button
					component={Link}
					href="/login-google"
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
