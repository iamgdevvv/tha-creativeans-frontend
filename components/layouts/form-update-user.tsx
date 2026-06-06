'use client'
import {
	Alert,
	Box,
	Button,
	Checkbox,
	Group,
	Select,
	SimpleGrid,
	Text,
	TextInput,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { redirect } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

import { optionsUserRole } from '@libs/enum'
import { useScrollFormError } from '@libs/hooks'
import { updateUser } from '@libs/repo/users'
import { UpdateUserSchema, type UpdateUser } from '@libs/schema/user'

type Props = {
	data: User
	disabled?: boolean
} & BoxProps

export default function FormUpdateUser({ data, disabled, ...props }: Props) {
	const [errorUpdateUser, setErrorUpdateUser] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<UpdateUser>({
		validate: schemaResolver(UpdateUserSchema, { sync: true }),
		initialValues: {
			name: data.name,
			email: data.email,
			role: data.role,
			isActive: data.isActive,
		},
	})

	const handlerSubmit = useCallback(
		async (payload: UpdateUser) => {
			setErrorUpdateUser(null)

			startActionSubmit(async () => {
				const result = await updateUser(data.id, payload)

				if (result.code === 'error') {
					setErrorUpdateUser('Failed to update data')
					return
				}

				redirect(`/admin/users/${result.data.id}`)
			})
		},
		[data],
	)

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorUpdateUser}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorUpdateUser}</Text>
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
				<Select
					key={form.key('role')}
					{...form.getInputProps('role')}
					label="Role"
					data={optionsUserRole}
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
				<Checkbox
					key={form.key('isActive')}
					{...form.getInputProps('isActive', { type: 'checkbox' })}
					label="Is Active?"
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
