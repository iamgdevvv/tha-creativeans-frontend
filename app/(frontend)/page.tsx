import { Button, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'

import Link from '@components/atoms/link'
import ProductCard from '@components/atoms/product-card'
import { queryProductsPublic } from '@libs/repo/products'

export const dynamic = 'force-dynamic'

export default async function Home() {
	const resultProducts = await queryProductsPublic({
		limit: 4,
		desc: ['createdAt'],
	})

	return (
		<Container
			my={{
				base: 'xl',
				md: 80,
			}}
		>
			<Stack gap="xl">
				<Group
					gap="xs"
					align="flex-start"
					justify="space-between"
				>
					<Title order={2}>Recent Products</Title>
					<Button
						variant="subtle"
						size="xs"
						fw={600}
						component={Link}
						href="/products"
						ml="auto"
						mt={4}
					>
						See More
					</Button>
				</Group>
				{resultProducts.code === 'success' && resultProducts.data.length ? (
					<SimpleGrid
						cols={{
							base: 1,
							xs: 2,
							md: 3,
							lg: 4,
						}}
					>
						{resultProducts.data.map((product, index) => (
							<ProductCard
								key={`${product.slug}-${index}`}
								data={product}
							/>
						))}
					</SimpleGrid>
				) : (
					<Text c="dimmed">
						Products not found, Products will appear here once they become available.
					</Text>
				)}
			</Stack>
		</Container>
	)
}
