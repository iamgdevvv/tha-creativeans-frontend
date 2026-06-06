import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import FormUpdateUserProfile from '@components/layouts/form-profile-user'
import { userMe } from '@libs/repo/users'

export const metadata: Metadata = {
	title: 'Update Profile',
}

export const dynamic = 'force-dynamic'

export default async function UserProfileUpdate() {
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
					Update
				</Badge>
			</Group>
			<FormUpdateUserProfile
				data={resultUser.data}
				mt="xl"
			/>
		</>
	)
}
