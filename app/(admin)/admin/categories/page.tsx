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
	Title,
} from '@mantine/core'
import type { Metadata } from 'next'
import { LuSearch } from 'react-icons/lu'

import ButtonDeleteCategory from '@components/atoms/button-delete-category'
import Link from '@components/atoms/link'
import { queryCategories } from '@libs/repo/categories'

export const metadata: Metadata = {
	title: 'Categories',
}

export const dynamic = 'force-dynamic'

type AppProps = {
	searchParams: Promise<{ q?: string; page?: string }>
}

export default async function Categories({ searchParams }: AppProps) {
	const { q, page: pageParam } = await searchParams

	const limit = 12
	const page = Number(pageParam) || 1
	const skip = (Number(page) - 1) * limit

	const resultCategories = await queryCategories({
		q,
		limit,
		skip,
	})

	return (
		<>
			<Group>
				<Title fz="xl">Categories</Title>
				<Button
					component={Link}
					href="/admin/categories/create"
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
						<TableTh ta="right">Action</TableTh>
					</TableTr>
				</TableThead>
				{resultCategories.code === 'success' && resultCategories.data.length ? (
					<>
						<TableTbody>
							{resultCategories.data.map((category) => (
								<TableTr key={category.id}>
									<TableTd>
										<Link
											href={`/admin/categories/${category.id}`}
											fz="sm"
											className="not-hover:text-black"
										>
											{category.name}
										</Link>
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
												href={`/admin/categories/${category.id}`}
											>
												View
											</Button>
											<ButtonDeleteCategory
												categoryId={category.id}
												variant="light"
												color="red"
												fz="xs"
												fw={600}
												px="xs"
												py={6}
											>
												Delete
											</ButtonDeleteCategory>
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
								>{`Showing ${resultCategories.skip + 1} - ${Math.min(resultCategories.total, resultCategories.limit * page)} of ${resultCategories.total}`}</Text>
								<PaginationRoot
									total={resultCategories.total}
									value={page}
								>
									<Group gap="xs">
										<PaginationPrevious
											component={Link}
											href={`/admin/categories?page=${page - 1}${q ? `&q=${q}` : ''}`}
										/>
										{resultCategories.total > limit * page ? (
											<PaginationNext
												component={Link}
												href={`/admin/categories?page=${page + 1}${q ? `&q=${q}` : ''}`}
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
					<TableCaption>Categories not found</TableCaption>
				)}
			</Table>
		</>
	)
}
