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
import { LuCheck, LuSearch, LuX } from 'react-icons/lu'

import ButtonDeleteUser from '@components/atoms/button-delete-user'
import Link from '@components/atoms/link'
import { queryUsers } from '@libs/repo/users'

export const metadata: Metadata = {
	title: 'Users',
}

export const dynamic = 'force-dynamic'

type AppProps = {
	searchParams: Promise<{ q?: string; page?: string }>
}

export default async function Users({ searchParams }: AppProps) {
	const { q, page: pageParam } = await searchParams

	const limit = 12
	const page = Number(pageParam) || 1
	const skip = (Number(page) - 1) * limit

	const resultUsers = await queryUsers<Pick<User, 'id' | 'name' | 'role' | 'isActive'>>({
		select: ['id', 'name', 'role', 'isActive'],
		desc: ['createdAt'],
		q,
		limit,
		skip,
	})

	return (
		<>
			<Group>
				<Title fz="xl">Users</Title>
				<Button
					component={Link}
					href="/admin/users/create"
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
						<TableTh>Role</TableTh>
						<TableTh>Status</TableTh>
						<TableTh ta="right">Action</TableTh>
					</TableTr>
				</TableThead>
				{resultUsers.code === 'success' && resultUsers.data.length ? (
					<>
						<TableTbody>
							{resultUsers.data.map((user) => (
								<TableTr key={user.id}>
									<TableTd>
										<Link
											href={`/admin/users/${user.id}`}
											fz="sm"
											className="not-hover:text-black"
										>
											{user.name}
										</Link>
									</TableTd>
									<TableTd fz="sm">{user.role}</TableTd>
									<TableTd fz="sm">
										<ThemeIcon
											color={user.isActive ? 'green' : 'red'}
											variant="light"
											size="md"
											radius="full"
										>
											{user.isActive ? (
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
												href={`/admin/users/${user.id}`}
											>
												View
											</Button>
											<ButtonDeleteUser
												userId={user.id}
												variant="light"
												color="red"
												fz="xs"
												fw={600}
												px="xs"
												py={6}
											>
												Delete
											</ButtonDeleteUser>
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
								>{`Showing ${resultUsers.skip + 1} - ${Math.min(resultUsers.total, resultUsers.limit * page)} of ${resultUsers.total}`}</Text>
								<PaginationRoot
									total={resultUsers.total}
									value={page}
								>
									<Group gap="xs">
										<PaginationPrevious
											component={Link}
											href={`/admin/users?page=${page - 1}${q ? `&q=${q}` : ''}`}
										/>
										{resultUsers.total > limit * page ? (
											<PaginationNext
												component={Link}
												href={`/admin/users?page=${page + 1}${q ? `&q=${q}` : ''}`}
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
					<TableCaption>Users not found</TableCaption>
				)}
			</Table>
		</>
	)
}
