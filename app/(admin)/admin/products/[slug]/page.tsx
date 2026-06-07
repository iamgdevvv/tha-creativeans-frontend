import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import ButtonDeleteProduct from '@components/atoms/button-delete-product'
import Link from '@components/atoms/link'
import FormUpdateProduct from '@components/layouts/form-update-product'
import { queryProduct } from '@libs/repo/products'

export const metadata: Metadata = {
	title: 'Detail Product',
}

export const dynamic = 'force-dynamic'

export default async function DetailProduct({ params }: { params: Promise<{ slug: string }> }) {
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
					Detail
				</Badge>
			</Group>
			<FormUpdateProduct
				data={resultProduct.data}
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
					href={`/admin/products/${resultProduct.data.id}/update`}
					radius="md"
				>
					Update Data
				</Button>
				<ButtonDeleteProduct
					productId={resultProduct.data.id}
					variant="light"
					color="red"
					radius="md"
				>
					Delete Data
				</ButtonDeleteProduct>
			</Group>
		</>
	)
}
