import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import Link from '@components/atoms/link'
import FormUpdateCategory from '@components/layouts/form-update-category'
import { queryCategory } from '@libs/repo/categories'

export const metadata: Metadata = {
	title: 'Update Category',
}

export const dynamic = 'force-dynamic'

export default async function UpdateCategory({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const resultCategory = await queryCategory(slug)

	if (resultCategory.code === 'error') {
		if (resultCategory.statusCode === 404) {
			return (
				<>
					<Group>
						<Title fz="xl">Category Not Found</Title>
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
						href="/admin/categories"
						mt="xl"
					>
						Back to categories
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
						{resultCategory.statusCode}
					</Badge>
				</Group>
				<Button
					component={Link}
					href="/admin/categories"
					mt="xl"
				>
					Back to categories
				</Button>
			</>
		)
	}

	return (
		<>
			<Group>
				<Title fz="xl">Category</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Update
				</Badge>
			</Group>
			<FormUpdateCategory
				data={resultCategory.data}
				mt="xl"
			/>
		</>
	)
}
