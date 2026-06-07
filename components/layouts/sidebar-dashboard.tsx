'use client'
import { Button, Stack, Title, type StackProps } from '@mantine/core'
import { usePathname } from 'next/navigation'
import { LuLogOut } from 'react-icons/lu'

import Link from '@components/atoms/link'
import { currentPathname } from '@libs/utils'

export default function SidebarDashboard({
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
			<Title
				order={4}
				fz="lg"
				mb="lg"
			>
				{auth.name}
			</Title>
			<Button
				component={Link}
				href="/dashboard"
				color="primary.2"
				variant={currentPathname(pathname, '/dashboard') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/dashboard') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/dashboard') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Dashboard
			</Button>
			<Button
				component={Link}
				href="/dashboard/profile"
				color="primary.2"
				variant={currentPathname(pathname, '/dashboard/profile') ? 'light' : 'subtle'}
				bg={currentPathname(pathname, '/dashboard/profile') ? 'primary.0' : undefined}
				c={currentPathname(pathname, '/dashboard/profile') ? 'primary' : 'black'}
				radius="md"
				justify="flex-start"
			>
				Profile
			</Button>
			<Button
				component="a"
				href="/logout?redirectUrl=/"
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
