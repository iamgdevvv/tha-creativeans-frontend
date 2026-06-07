import { Badge, Button, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import Link from '@components/atoms/link'
import FormUpdateUserProfile from '@components/layouts/form-profile-user'
import { userMe } from '@libs/repo/users'

export const metadata: Metadata = {
	title: 'Profile',
}

export const dynamic = 'force-dynamic'

export default async function UserProfile() {
	const resultUser = await userMe()

	if (resultUser.code === 'error') {
		redirect('/logout')
	}

	return (
		<>
			<Group>
				<Title fz="xl">Profile</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Detail
				</Badge>
			</Group>
			<FormUpdateUserProfile
				data={resultUser.data}
				disabled
				mt="xl"
			/>
			<Group
				gap="xs"
				mt="xl"
				justify="flex-end"
			>
				<Button
					component={Link}
					href={'/admin/profile/update'}
					radius="md"
				>
					Update Data
				</Button>
				<Button
					component={Link}
					href={'/admin/profile/password'}
					variant="light"
					radius="md"
				>
					{resultUser.data.hasAuth ? 'Change Password' : 'Set Password'}
				</Button>
			</Group>
		</>
	)
}
