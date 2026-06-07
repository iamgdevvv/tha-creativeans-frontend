import { Text, Title } from '@mantine/core'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
	return (
		<>
			<Title
				fz="h2"
				mt="xl"
			>
				Welcome to Dashboard!
			</Title>
			<Text mt="sm">
				Access your account information, track activity, and manage your preferences from
				your dashboard.
			</Text>
		</>
	)
}
