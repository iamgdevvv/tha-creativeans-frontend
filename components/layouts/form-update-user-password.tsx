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
import { updateUserPassword } from '@libs/repo/users'
import { UpdateUserPasswordSchema, type UpdateUserPassword } from '@libs/schema/user'

type Props = {
	userId: User['id']
} & BoxProps

export default function FormUpdateUserPassword({ userId, ...props }: Props) {
	const [errorUpdateUserPassword, setErrorUpdateUserPassword] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<UpdateUserPassword>({
		validate: schemaResolver(UpdateUserPasswordSchema, { sync: true }),
	})

	const handlerSubmit = useCallback(
		async (payload: UpdateUserPassword) => {
			setErrorUpdateUserPassword(null)

			startActionSubmit(async () => {
				const result = await updateUserPassword(userId, payload)

				if (result.code === 'error') {
					setErrorUpdateUserPassword('Failed to update password')
					return
				}

				redirect(`/admin/users/${userId}`)
			})
		},
		[userId],
	)

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
					Update Data
				</Button>
			</Group>
		</Box>
	)
}
