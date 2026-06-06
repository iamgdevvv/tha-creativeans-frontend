import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import FormCreateCategory from '@components/layouts/form-create-category'

export const metadata: Metadata = {
	title: 'Create Category',
}

export const dynamic = 'force-dynamic'

export default async function CreateCategory() {
	return (
		<>
			<Group>
				<Title fz="xl">New Categories</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Create
				</Badge>
			</Group>
			<FormCreateCategory mt="xl" />
		</>
	)
}
