import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import FormUpdateUserProfilePassword from '@components/layouts/form-profile-user-password'

export const metadata: Metadata = {
	title: 'Change Password',
}

export const dynamic = 'force-dynamic'

export default async function UserProfileUpdatePassword() {
	return (
		<>
			<Group>
				<Title fz="xl">Change Password</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Update
				</Badge>
			</Group>
			<FormUpdateUserProfilePassword mt="xl" />
		</>
	)
}
