import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import ButtonDeleteUser from '@components/atoms/button-delete-user'
import Link from '@components/atoms/link'
import FormUpdateUser from '@components/layouts/form-update-user'
import { queryUser } from '@libs/repo/users'

export const metadata: Metadata = {
	title: 'Detail User',
}

export const dynamic = 'force-dynamic'

export default async function DetailUser({ params }: { params: Promise<{ slug: string }> }) {
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
					Detail
				</Badge>
			</Group>
			<FormUpdateUser
				data={resultUser.data}
				disabled
				mt="xl"
			/>
			<Group
				gap="xs"
				mt="xl"
				justify="flex-end"
			>
				<Button
					component={Link}
					href={`/admin/users/${resultUser.data.id}/update`}
					radius="md"
				>
					Update
				</Button>
				<Button
					component={Link}
					href={`/admin/users/${resultUser.data.id}/password`}
					variant="light"
					radius="md"
				>
					Change Password
				</Button>
				<ButtonDeleteUser
					userId={resultUser.data.id}
					variant="light"
					color="red"
					radius="md"
				>
					Delete
				</ButtonDeleteUser>
			</Group>
		</>
	)
}
