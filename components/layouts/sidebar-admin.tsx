'use client'
import { Button, Divider, Stack, type StackProps } from '@mantine/core'
import { usePathname } from 'next/navigation'
import { LuLogOut } from 'react-icons/lu'

import Link from '@components/atoms/link'
import { currentPathname } from '@libs/utils'

export default function SidebarAdmin({
	auth,
	...props
}: StackProps & {
	auth: UserMe
}) {
	const pathname = usePathname()

	return (
		<Stack
			gap={2}
			{...props}
		>
			<Button
				component={Link}
				href="/admin"
				color="primary.2"
				variant={currentPathname(pathname, '/admin') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/admin') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/admin') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Dashboard
			</Button>
			<Button
				component={Link}
				href="/admin/assets"
				color="primary.2"
				variant={currentPathname(pathname, '/admin/assets') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/admin/assets') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/admin/assets') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Assets
			</Button>
			<Button
				component={Link}
				href="/admin/products"
				color="primary.2"
				variant={currentPathname(pathname, '/admin/products') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/admin/products') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/admin/products') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Products
			</Button>
			<Button
				component={Link}
				href="/admin/categories"
				color="primary.2"
				variant={currentPathname(pathname, '/admin/categories') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/admin/categories') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/admin/categories') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Categories
			</Button>
			<Divider my="md" />
			{auth.role === 'ADMIN' ? (
				<Button
					component={Link}
					href="/admin/users"
					color="primary.2"
					variant={currentPathname(pathname, '/admin/users') ? 'light' : 'subtle'}
					bg={currentPathname(pathname, '/admin/users') ? 'primary.0' : undefined}
					c={currentPathname(pathname, '/admin/users') ? 'primary' : 'black'}
					radius="md"
					justify="flex-start"
				>
					Users
				</Button>
			) : null}
			<Button
				component={Link}
				href="/admin/profile"
				color="primary.2"
				variant={currentPathname(pathname, '/admin/profile') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/admin/profile') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/admin/profile') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Profile
			</Button>
			<Button
				component={Link}
				href="/logout"
				variant="subtle"
				color="red"
				radius="md"
				justify="flex-start"
				leftSection={<LuLogOut size={14} />}
			>
				Logout
			</Button>
		</Stack>
	)
}
