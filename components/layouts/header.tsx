'use client'
import {
	ActionIcon,
	Avatar,
	Button,
	Container,
	Group,
	Input,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuLabel,
	MenuTarget,
	Popover,
	Stack,
	type ContainerProps,
	type StackProps,
} from '@mantine/core'
import { useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { LuLogOut, LuSearch } from 'react-icons/lu'
import { TbBrand4Chan } from 'react-icons/tb'

import Link from '@components/atoms/link'
import { useRouter } from '@libs/modules/router'
import { cn } from '@libs/utils'

export type HeaderProps = {
	data?: UserMe
	containerSize?: ContainerProps['size']
} & StackProps

export default function Header({ data, containerSize, className, ...props }: HeaderProps) {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [searchOpen, setSearchOpen] = useState(false)

	const handleSearch = useCallback(
		(term?: string) => {
			const params = new URLSearchParams(searchParams.toString())

			if (term) {
				params.set('q', term)
			} else {
				params.delete('q')
			}

			router.push(`/?${params.toString()}`)
		},
		[router, searchParams],
	)

	return (
		<Stack
			pos="sticky"
			top={0}
			w="100%"
			bg="white"
			{...props}
			component="header"
			data-slot="header"
			className={cn('z-max shadow-allaround', className)}
		>
			<Container
				py={{
					base: 'md',
					md: 'lg',
				}}
				size={containerSize}
			>
				<Group
					gap="lg"
					justify="space-between"
				>
					{/* Logo */}
					<ActionIcon
						variant="transparent"
						c="primary"
						size={48}
						component={Link}
						href="/"
						aria-label="Logo"
					>
						<TbBrand4Chan size={40} />
					</ActionIcon>
					<Input
						type="search"
						w="50%"
						maw={320}
						visibleFrom="sm"
						placeholder="Search"
						defaultValue={searchParams.get('q') || ''}
						rightSection={<LuSearch className="pointer-events-none" />}
						rightSectionPointerEvents="auto"
						rightSectionProps={{
							onClick: (e) => {
								const value = (
									e.target as HTMLDivElement
								)?.parentElement?.querySelector('input')?.value

								handleSearch(value)

								setSearchOpen(false)
							},
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleSearch(e.currentTarget.value)
							}
						}}
					/>

					<Group
						gap="xs"
						ml="auto"
					>
						<Popover
							width={280}
							position="bottom"
							withinPortal={false}
							opened={searchOpen}
							onChange={setSearchOpen}
						>
							<Popover.Target>
								<ActionIcon
									variant="light"
									radius="full"
									size="lg"
									hiddenFrom="sm"
									onClick={() => setSearchOpen((o) => !o)}
								>
									<LuSearch />
								</ActionIcon>
							</Popover.Target>
							<Popover.Dropdown>
								<Input
									type="search"
									w="100%"
									placeholder="Search"
									defaultValue={searchParams.get('q') || ''}
									rightSection={<LuSearch className="pointer-events-none" />}
									rightSectionPointerEvents="auto"
									rightSectionProps={{
										onClick: (e) => {
											const value = (
												e.target as HTMLDivElement
											)?.parentElement?.querySelector('input')?.value

											handleSearch(value)

											setSearchOpen(false)
										},
									}}
									onKeyDown={(e) => {
										if (e.key === 'Enter') {
											handleSearch(e.currentTarget.value)
										}
									}}
								/>
							</Popover.Dropdown>
						</Popover>
						{data ? (
							<Menu
								width={200}
								position="bottom-end"
								withinPortal={false}
							>
								<MenuTarget>
									<Avatar
										component="button"
										name={data.name}
									/>
								</MenuTarget>

								<MenuDropdown>
									<MenuLabel>{data.email}</MenuLabel>
									<MenuItem
										component={Link}
										href="/dashboard"
									>
										Dashboard
									</MenuItem>
									<MenuItem
										component={Link}
										href="/dashboard/profile"
									>
										Profile
									</MenuItem>
									<MenuDivider />
									{['ADMIN', 'STAFF'].includes(data.role) ? (
										<MenuItem
											component={Link}
											href="/admin"
										>
											Admin
										</MenuItem>
									) : null}
									<MenuItem
										component={Link}
										href="/logout?redirectUrl=/"
										color="red"
										leftSection={<LuLogOut size={14} />}
									>
										Logout
									</MenuItem>
								</MenuDropdown>
							</Menu>
						) : (
							<>
								<Button
									variant="light"
									size="xs"
									component={Link}
									visibleFrom="sm"
									href="/register"
								>
									Sign up
								</Button>
								<Button
									component={Link}
									size="xs"
									href="/login"
								>
									Sign in
								</Button>
							</>
						)}
					</Group>
				</Group>
			</Container>
		</Stack>
	)
}
