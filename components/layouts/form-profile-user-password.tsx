'use client'
import {
	Alert,
	Box,
	Button,
	Group,
	PasswordInput,
	Text,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { redirect } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

import { useScrollFormError } from '@libs/hooks'
import { updateUserProfilePassword } from '@libs/repo/users'
import { UpdateUserProfilePasswordSchema, type UpdateUserProfilePassword } from '@libs/schema/user'

export default function FormUpdateUserProfilePassword(props: BoxProps) {
	const [errorUpdateUserProfilePassword, setErrorUpdateUserProfilePassword] = useState<
		string | null
	>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<UpdateUserProfilePassword>({
		validate: schemaResolver(UpdateUserProfilePasswordSchema, { sync: true }),
	})

	const handlerSubmit = useCallback(async (payload: UpdateUserProfilePassword) => {
		setErrorUpdateUserProfilePassword(null)

		startActionSubmit(async () => {
			const result = await updateUserProfilePassword({
				password: payload.password,
				new_password: payload.new_password,
			})

			console.log('result', result)

			if (result.code === 'error') {
				setErrorUpdateUserProfilePassword('Failed to update password')
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
			<Transition mounted={!!errorUpdateUserProfilePassword}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorUpdateUserProfilePassword}</Text>
					</Alert>
				)}
			</Transition>
			<PasswordInput
				key={form.key('password')}
				{...form.getInputProps('password')}
				label="Password"
				readOnly={isLoadingSubmit}
			/>
			<PasswordInput
				key={form.key('new_password')}
				{...form.getInputProps('new_password')}
				label="New Password"
				mt="sm"
				readOnly={isLoadingSubmit}
			/>
			<PasswordInput
				key={form.key('confirm_password')}
				{...form.getInputProps('confirm_password')}
				label="Confirm Password"
				mt="sm"
				readOnly={isLoadingSubmit}
			/>
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
		</Box>
	)
}
