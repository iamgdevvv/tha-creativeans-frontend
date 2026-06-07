import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import Link from '@components/atoms/link'
import FormUpdateProduct from '@components/layouts/form-update-product'
import { queryProduct } from '@libs/repo/products'

export const metadata: Metadata = {
	title: 'Update Product',
}

export const dynamic = 'force-dynamic'

export default async function UpdateProduct({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const resultProduct = await queryProduct<DetailProduct>(slug, {
		include: ['productThumbnails', 'productCategories'],
	})

	if (resultProduct.code === 'error') {
		if (resultProduct.statusCode === 404) {
			return (
				<>
					<Group>
						<Title fz="xl">Product Not Found</Title>
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
						href="/admin/products"
						mt="xl"
					>
						Back to products
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
						{resultProduct.statusCode}
					</Badge>
				</Group>
				<Button
					component={Link}
					href="/admin/products"
					mt="xl"
				>
					Back to products
				</Button>
			</>
		)
	}

	return (
		<>
			<Group>
				<Title fz="xl">Product</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Update
				</Badge>
			</Group>
			<FormUpdateProduct
				data={resultProduct.data}
				mt="xl"
			/>
		</>
	)
}
