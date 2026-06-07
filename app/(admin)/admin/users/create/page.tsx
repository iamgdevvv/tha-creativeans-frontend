import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import FormCreateUser from '@components/layouts/form-create-user'

export const metadata: Metadata = {
	title: 'Create User',
}

export const dynamic = 'force-dynamic'

export default async function CreateUser() {
	return (
		<>
			<Group>
				<Title fz="xl">New User</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Create
				</Badge>
			</Group>
			<FormCreateUser mt="xl" />
		</>
	)
}
