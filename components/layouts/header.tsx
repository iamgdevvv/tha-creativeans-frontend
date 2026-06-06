'use client'
import {
	ActionIcon,
	Container,
	Group,
	Input,
	Popover,
	Stack,
	type ContainerProps,
	type StackProps,
} from '@mantine/core'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { LuSearch } from 'react-icons/lu'
import { TbBrand4Chan } from 'react-icons/tb'

import Link from '@components/atoms/link'
import { useRouter } from '@libs/modules/router'
import { cn } from '@libs/utils'

export type HeaderProps = {
	containerSize?: ContainerProps['size']
} & StackProps

export default function Header({ containerSize, className, ...props }: HeaderProps) {
	const router = useRouter()
	const pathname = usePathname()
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
			router.push(`${pathname}?${params.toString()}`)
		},
		[pathname, router, searchParams],
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
					gap="xs"
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
							/>
						</Popover.Dropdown>
					</Popover>
					<Input
						maw={480}
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
					/>
				</Group>
			</Container>
		</Stack>
	)
}
