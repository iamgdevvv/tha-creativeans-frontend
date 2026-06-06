'use client'
import {
	Alert,
	Box,
	Button,
	Checkbox,
	Group,
	PasswordInput,
	Select,
	SimpleGrid,
	Text,
	TextInput,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { redirect } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'

import { optionsUserRole } from '@libs/enum'
import { useScrollFormError } from '@libs/hooks'
import { createUser } from '@libs/repo/users'
import { CreateUserSchema, type CreateUser } from '@libs/schema/user'

export default function FormCreateUser(props: BoxProps) {
	const [errorCreateUser, setErrorCreateUser] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<CreateUser>({
		validate: schemaResolver(CreateUserSchema, { sync: true }),
	})

	useEffect(() => {
		form.setFieldValue('isActive', true)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handlerSubmit = useCallback(async (payload: CreateUser) => {
		setErrorCreateUser(null)

		startActionSubmit(async () => {
			const result = await createUser(payload)

			if (result.code === 'error') {
				setErrorCreateUser('Failed to create data')
				return
			}

			redirect(`/admin/users/${result.data.id}`)
		})
	}, [])

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorCreateUser}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorCreateUser}</Text>
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
				/>
				<Select
					key={form.key('role')}
					{...form.getInputProps('role')}
					label="Role"
					data={optionsUserRole}
					readOnly={isLoadingSubmit}
				/>
				<TextInput
					type="email"
					key={form.key('email')}
					{...form.getInputProps('email')}
					label="E-mail"
					readOnly={isLoadingSubmit}
				/>
				<PasswordInput
					key={form.key('password')}
					{...form.getInputProps('password')}
					label="Password"
					readOnly={isLoadingSubmit}
				/>
				<Checkbox
					key={form.key('isActive')}
					{...form.getInputProps('isActive', { type: 'checkbox' })}
					label="Is Active?"
					readOnly={isLoadingSubmit}
				/>
			</SimpleGrid>
			<Group
				mt="xl"
				justify="flex-end"
			>
				<Button
					type="submit"
					radius="md"
					loading={isLoadingSubmit}
				>
					Create Data
				</Button>
			</Group>
		</Box>
	)
}
