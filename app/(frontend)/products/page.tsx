import {
	Container,
	Group,
	PaginationNext,
	PaginationPrevious,
	PaginationRoot,
	SimpleGrid,
	Stack,
	Text,
} from '@mantine/core'

import Link from '@components/atoms/link'
import ProductCard from '@components/atoms/product-card'
import { queryProductsPublic } from '@libs/repo/products'

export const dynamic = 'force-dynamic'

type AppProps = {
	searchParams: Promise<{ q?: string; page?: string }>
}

export default async function Products({ searchParams }: AppProps) {
	const { q, page: pageParam } = await searchParams

	const limit = 12
	const page = Number(pageParam) || 1
	const skip = (Number(page) - 1) * limit

	const resultProducts = await queryProductsPublic({
		desc: ['createdAt'],
		q,
		limit,
		skip,
	})

	return (
		<Container
			my={{
				base: 'xl',
				md: 80,
			}}
		>
			{resultProducts.code === 'success' && resultProducts.data.length ? (
				<Stack gap="xl">
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
					<Group justify="flex-end">
						<Text
							span
						>{`Showing ${resultProducts.skip + 1} - ${Math.min(resultProducts.total, resultProducts.limit * page)} of ${resultProducts.total}`}</Text>
						<PaginationRoot
							total={resultProducts.total}
							value={page}
						>
							<Group gap="xs">
								<PaginationPrevious
									component={Link}
									href={`/products?page=${page - 1}${q ? `&q=${q}` : ''}`}
								/>
								{resultProducts.total > limit * page ? (
									<PaginationNext
										component={Link}
										href={`/products?page=${page + 1}${q ? `&q=${q}` : ''}`}
									/>
								) : (
									<PaginationNext disabled />
								)}
							</Group>
						</PaginationRoot>
					</Group>
				</Stack>
			) : (
				<Text c="dimmed">
					Products not found, Products will appear here once they become available.
				</Text>
			)}
		</Container>
	)
}
