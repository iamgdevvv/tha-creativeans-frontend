'use client'
import {
	Alert,
	Box,
	Button,
	Group,
	SimpleGrid,
	Text,
	TextInput,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { redirect } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

import { useScrollFormError } from '@libs/hooks'
import { updateUserProfile } from '@libs/repo/users'
import { UpdateUserProfileSchema, type UpdateUserProfile } from '@libs/schema/user'

type Props = {
	data: UserMe
	disabled?: boolean
} & BoxProps

export default function FormUpdateUserProfile({ data, disabled, ...props }: Props) {
	const [errorUpdateUserProfile, setErrorUpdateUserProfile] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<UpdateUserProfile>({
		validate: schemaResolver(UpdateUserProfileSchema, { sync: true }),
		initialValues: {
			name: data.name,
			email: data.email,
		},
	})

	const handlerSubmit = useCallback(async (payload: UpdateUserProfile) => {
		setErrorUpdateUserProfile(null)

		startActionSubmit(async () => {
			const result = await updateUserProfile(payload)

			if (result.code === 'error') {
				setErrorUpdateUserProfile('Failed to update data')
				return
			}

			redirect('/admin/profile')
		})
	}, [])

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorUpdateUserProfile}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorUpdateUserProfile}</Text>
					</Alert>
				)}
			</Transition>
			<SimpleGrid
				cols={{
					base: 1,
					sm: 2,
				}}
			>
				<TextInput
					key={form.key('name')}
					{...form.getInputProps('name')}
					label="Name"
					readOnly={isLoadingSubmit}
					disabled={disabled}
				/>
				<TextInput
					type="email"
					key={form.key('email')}
					{...form.getInputProps('email')}
					label="E-mail"
					readOnly={isLoadingSubmit}
					disabled={disabled}
				/>
			</SimpleGrid>

			{!disabled ? (
				<Group
					mt="xl"
					justify="flex-end"
				>
					<Button
						type="submit"
						radius="md"
						loading={isLoadingSubmit}
					>
						Update Data
					</Button>
				</Group>
			) : null}
		</Box>
	)
}
