import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import Link from '@components/atoms/link'
import FormUpdateUser from '@components/layouts/form-update-user'
import { queryUser } from '@libs/repo/users'

export const metadata: Metadata = {
	title: 'Update User',
}

export const dynamic = 'force-dynamic'

export default async function UpdateUser({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const resultUser = await queryUser<User>(slug)

	if (resultUser.code === 'error') {
		if (resultUser.statusCode === 404) {
			return (
				<>
					<Group>
						<Title fz="xl">User Not Found</Title>
						<Badge
							variant="light"
							color="dark"
							p="sm"
							tt="uppercase"
							ml="auto"
						>
							404
						</Badge>
					</Group>
					<Button
						component={Link}
						href="/admin/users"
						mt="xl"
					>
						Back to users
					</Button>
				</>
			)
		}

		return (
			<>
				<Group>
					<Title fz="xl">Error</Title>
					<Badge
						variant="light"
						color="red"
						p="sm"
						tt="uppercase"
						ml="auto"
					>
						{resultUser.statusCode}
					</Badge>
				</Group>
				<Button
					component={Link}
					href="/admin/users"
					mt="xl"
				>
					Back to users
				</Button>
			</>
		)
	}

	return (
		<>
			<Group>
				<Title fz="xl">User</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Update
				</Badge>
			</Group>
			<FormUpdateUser
				data={resultUser.data}
				mt="xl"
			/>
		</>
	)
}
