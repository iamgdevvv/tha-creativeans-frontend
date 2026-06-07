import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import FormCreateProduct from '@components/layouts/form-create-product'

export const metadata: Metadata = {
	title: 'Create Product',
}

export const dynamic = 'force-dynamic'

export default async function CreateProduct() {
	return (
		<>
			<Group>
				<Title fz="xl">New Product</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Create
				</Badge>
			</Group>
			<FormCreateProduct mt="xl" />
		</>
	)
}
