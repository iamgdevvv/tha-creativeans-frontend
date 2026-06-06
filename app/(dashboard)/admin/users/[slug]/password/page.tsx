import { Badge, Group, Title } from '@mantine/core'
import type { Metadata } from 'next'

import FormUpdateUserPassword from '@components/layouts/form-update-user-password'

export const metadata: Metadata = {
	title: 'Update User Password',
}

export const dynamic = 'force-dynamic'

export default async function UpdateUserPassword({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	return (
		<>
			<Group>
				<Title fz="xl">User Password</Title>
				<Badge
					variant="light"
					p="sm"
					tt="uppercase"
					ml="auto"
				>
					Update
				</Badge>
			</Group>
			<FormUpdateUserPassword
				userId={slug}
				mt="xl"
			/>
		</>
	)
}
