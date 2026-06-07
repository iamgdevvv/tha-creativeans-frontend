'use client'
import {
	Alert,
	Box,
	Button,
	PasswordInput,
	Text,
	TextInput,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { redirect } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

import { useScrollFormError } from '@libs/hooks'
import { authRegister } from '@libs/repo/auth'
import { AuthRegisterSchema, type AuthRegister } from '@libs/schema/auth'

export default function FormRegister(props: BoxProps) {
	const [errorAuthRegister, setErrorAuthRegister] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<AuthRegister>({
		validate: schemaResolver(AuthRegisterSchema, { sync: true }),
	})

	const handlerSubmit = useCallback(async (payload: AuthRegister) => {
		setErrorAuthRegister(null)

		startActionSubmit(async () => {
			const result = await authRegister(payload)

			if (result.code === 'error') {
				setErrorAuthRegister(
					result.statusCode === 404
						? 'User not found'
						: result.statusCode === 401
							? 'Password is incorrect'
							: result.statusCode === 403
								? 'Your account is disabled'
								: result.statusCode === 501
									? 'Your account is not verified, Try login with oauth'
									: 'Something went wrong',
				)
				return
			}

			redirect('/auth/login')
		})
	}, [])

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorAuthRegister}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorAuthRegister}</Text>
					</Alert>
				)}
			</Transition>
			<TextInput
				key={form.key('name')}
				{...form.getInputProps('name')}
				label="Name"
				placeholder="Your name"
				readOnly={isLoadingSubmit}
			/>
			<TextInput
				key={form.key('email')}
				{...form.getInputProps('email')}
				label="Email"
				placeholder="example@email.com"
				readOnly={isLoadingSubmit}
				mt="md"
			/>
			<PasswordInput
				key={form.key('password')}
				{...form.getInputProps('password')}
				label="Password"
				placeholder="Your password"
				readOnly={isLoadingSubmit}
				mt="md"
			/>
			<Button
				type="submit"
				fullWidth
				mt="xl"
				radius="md"
				loading={isLoadingSubmit}
			>
				Sign in
			</Button>
		</Box>
	)
}
