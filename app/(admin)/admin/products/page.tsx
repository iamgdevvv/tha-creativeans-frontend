import {
	ActionIcon,
	Button,
	Group,
	Input,
	PaginationNext,
	PaginationPrevious,
	PaginationRoot,
	Table,
	TableCaption,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	ThemeIcon,
	Title,
} from '@mantine/core'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { LuCheck, LuSearch, LuX } from 'react-icons/lu'

import ButtonDeleteProduct from '@components/atoms/button-delete-product'
import Link from '@components/atoms/link'
import { queryProducts } from '@libs/repo/products'
import { userMe } from '@libs/repo/users'
import { displayPrice, displayRating } from '@libs/utils'

export const metadata: Metadata = {
	title: 'Products',
}

export const dynamic = 'force-dynamic'

type AppProps = {
	searchParams: Promise<{ q?: string; page?: string }>
}

export default async function Products({ searchParams }: AppProps) {
	const authUser = await userMe()

	if (authUser.code === 'error') {
		redirect('/login')
	}

	const { q, page: pageParam } = await searchParams

	const limit = 12
	const page = Number(pageParam) || 1
	const skip = (Number(page) - 1) * limit

	const resultProducts = await queryProducts<
		Pick<Product, 'id' | 'name' | 'price' | 'rating' | 'inStock'>
	>({
		select: ['id', 'name', 'price', 'rating', 'inStock'],
		desc: ['createdAt'],
		q,
		limit,
		skip,
		userEmail: authUser.data.role !== 'ADMIN' ? authUser.data.email : undefined,
	})

	return (
		<>
			<Group>
				<Title fz="xl">Products</Title>
				<Button
					component={Link}
					href="/admin/products/create"
					variant="light"
					fz="xs"
					fw={600}
					px="xs"
					py="xs"
					ml="auto"
				>
					Add New
				</Button>
			</Group>
			<Group
				component="form"
				mt="xl"
				gap="xs"
				justify="flex-end"
			>
				<Input
					key={`search-${q}-${page}`}
					maw={480}
					visibleFrom="sm"
					placeholder="Search"
					name="q"
					defaultValue={q}
					rightSectionPointerEvents="auto"
					rightSectionWidth={40}
					rightSection={
						<ActionIcon
							type="submit"
							variant="subtle"
						>
							<LuSearch className="pointer-events-none" />
						</ActionIcon>
					}
				/>
			</Group>
			<Table
				mt="sm"
				striped
				withRowBorders={false}
			>
				<TableThead>
					<TableTr>
						<TableTh>Name</TableTh>
						<TableTh>Price</TableTh>
						<TableTh>Rating</TableTh>
						<TableTh>Stock Available</TableTh>
						<TableTh ta="right">Action</TableTh>
					</TableTr>
				</TableThead>
				{resultProducts.code === 'success' && resultProducts.data.length ? (
					<>
						<TableTbody>
							{resultProducts.data.map((product) => (
								<TableTr key={product.id}>
									<TableTd>
										<Link
											href={`/admin/products/${product.id}`}
											fz="sm"
											className="not-hover:text-black"
										>
											{product.name}
										</Link>
									</TableTd>
									<TableTd fz="sm">{displayPrice(product.price)}</TableTd>
									<TableTd fz="sm">{displayRating(product.rating)}</TableTd>
									<TableTd fz="sm">
										<ThemeIcon
											color={product.inStock ? 'green' : 'red'}
											variant="light"
											size="md"
											radius="full"
										>
											{product.inStock ? (
												<LuCheck size={16} />
											) : (
												<LuX size={16} />
											)}
										</ThemeIcon>
									</TableTd>
									<TableTd>
										<Group
											gap={6}
											justify="flex-end"
										>
											<Button
												variant="light"
												fz="xs"
												fw={600}
												px="xs"
												py={6}
												component={Link}
												href={`/admin/products/${product.id}`}
											>
												View
											</Button>
											<ButtonDeleteProduct
												productId={product.id}
												variant="light"
												color="red"
												fz="xs"
												fw={600}
												px="xs"
												py={6}
											>
												Delete
											</ButtonDeleteProduct>
										</Group>
									</TableTd>
								</TableTr>
							))}
						</TableTbody>
						<TableCaption>
							<Group justify="flex-end">
								<Text
									span
									size="sm"
								>{`Showing ${resultProducts.skip + 1} - ${Math.min(resultProducts.total, resultProducts.limit * page)} of ${resultProducts.total}`}</Text>
								<PaginationRoot
									total={resultProducts.total}
									value={page}
								>
									<Group gap="xs">
										<PaginationPrevious
											component={Link}
											href={`/admin/products?page=${page - 1}${q ? `&q=${q}` : ''}`}
										/>
										{resultProducts.total > limit * page ? (
											<PaginationNext
												component={Link}
												href={`/admin/products?page=${page + 1}${q ? `&q=${q}` : ''}`}
											/>
										) : (
											<PaginationNext disabled />
										)}
									</Group>
								</PaginationRoot>
							</Group>
						</TableCaption>
					</>
				) : (
					<TableCaption>Products not found</TableCaption>
				)}
			</Table>
		</>
	)
}
