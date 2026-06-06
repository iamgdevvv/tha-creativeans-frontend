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
import { userMePassword } from '@libs/repo/users'
import { UpdateUserPasswordSchema, type UpdateUserPassword } from '@libs/schema/user'

export default function FormUserMePassword(props: BoxProps) {
	const [errorUpdateUserPassword, setErrorUpdateUserPassword] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<UpdateUserPassword>({
		validate: schemaResolver(UpdateUserPasswordSchema, { sync: true }),
	})

	const handlerSubmit = useCallback(async (payload: UpdateUserPassword) => {
		setErrorUpdateUserPassword(null)

		startActionSubmit(async () => {
			const result = await userMePassword(payload)

			if (result.code === 'error') {
				setErrorUpdateUserPassword('Failed to set password')
				return
			}

			redirect('/admin/profile/')
		})
	}, [])

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorUpdateUserPassword}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorUpdateUserPassword}</Text>
					</Alert>
				)}
			</Transition>
			<PasswordInput
				key={form.key('password')}
				{...form.getInputProps('password')}
				label="Password"
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
					Save Password
				</Button>
			</Group>
		</Box>
	)
}
