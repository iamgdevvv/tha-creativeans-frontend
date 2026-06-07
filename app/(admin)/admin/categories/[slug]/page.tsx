import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import ButtonDeleteCategory from '@components/atoms/button-delete-category'
import Link from '@components/atoms/link'
import FormUpdateCategory from '@components/layouts/form-update-category'
import { queryCategory } from '@libs/repo/categories'

export const metadata: Metadata = {
	title: 'Detail Category',
}

export const dynamic = 'force-dynamic'

export default async function DetailCategory({ params }: PageProps<'/admin/categories/[slug]'>) {
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
					Detail
				</Badge>
			</Group>
			<FormUpdateCategory
				data={resultCategory.data}
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
					href={`/admin/categories/${resultCategory.data.id}/update`}
					radius="md"
				>
					Update Data
				</Button>
				<ButtonDeleteCategory
					categoryId={resultCategory.data.id}
					variant="light"
					color="red"
					radius="md"
				>
					Delete Data
				</ButtonDeleteCategory>
			</Group>
		</>
	)
}
