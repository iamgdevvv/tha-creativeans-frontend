import {
	ActionIcon,
	Avatar,
	Container,
	Group,
	Menu,
	MenuDivider,
	MenuDropdown,
	MenuItem,
	MenuLabel,
	MenuTarget,
	Stack,
	type ContainerProps,
	type StackProps,
} from '@mantine/core'
import { LuLogOut } from 'react-icons/lu'
import { TbBrand4Chan } from 'react-icons/tb'

import Link from '@components/atoms/link'
import { cn } from '@libs/utils'

export type HeaderProps = {
	data: UserMe
	containerSize?: ContainerProps['size']
} & StackProps

export default function HeaderAdmin({ data, containerSize, className, ...props }: HeaderProps) {
	return (
		<Stack
			pos="sticky"
			top={0}
			w="100%"
			bg="white"
			{...props}
			component="header"
			data-slot="HeaderAdmin"
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
							<MenuLabel>Quick Actions</MenuLabel>
							<MenuItem
								component={Link}
								href="/admin/products"
							>
								Products
							</MenuItem>
							<MenuItem
								component={Link}
								href="/admin/categories"
							>
								Categories
							</MenuItem>
							<MenuDivider />
							<MenuItem
								component={Link}
								href="/logout"
								color="red"
								leftSection={<LuLogOut size={14} />}
							>
								Logout
							</MenuItem>
						</MenuDropdown>
					</Menu>
				</Group>
			</Container>
		</Stack>
	)
}
