import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import FormUpdateUserProfilePassword from '@components/layouts/form-profile-user-password'
import FormUserMePassword from '@components/layouts/form-userme-password'
import { userMe } from '@libs/repo/users'

export const metadata: Metadata = {
	title: 'Change Password',
}

export const dynamic = 'force-dynamic'

export default async function UserProfileUpdatePassword() {
	const resultUser = await userMe()

	if (resultUser.code === 'error') {
		redirect('/logout')
	}

	return (
		<>
			<Group>
				<Title fz="xl">Profile Password</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					{resultUser.data.hasAuth ? 'Update' : 'New'}
				</Badge>
			</Group>
			{resultUser.data.hasAuth ? (
				<FormUpdateUserProfilePassword mt="xl" />
			) : (
				<FormUserMePassword mt="xl" />
			)}
		</>
	)
}
