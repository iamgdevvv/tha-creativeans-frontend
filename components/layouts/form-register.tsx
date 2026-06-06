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
import { useSetState } from '@mantine/hooks'
import { useCallback, useTransition } from 'react'

import { useScrollFormError } from '@libs/hooks'
import { authRegister } from '@libs/repo/auth'
import { AuthRegisterSchema, type AuthRegister } from '@libs/schema/auth'

export default function FormRegister(props: BoxProps) {
	const [resultAuthRegister, setResultAuthRegister] = useSetState<{
		data: User | null
		error: string | null
	}>({
		data: null,
		error: null,
	})
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<AuthRegister>({
		validate: schemaResolver(AuthRegisterSchema, { sync: true }),
	})

	const handlerSubmit = useCallback(
		async (payload: AuthRegister) => {
			setResultAuthRegister({ data: null, error: null })

			startActionSubmit(async () => {
				const result = await authRegister(payload)

				if (result.code === 'error') {
					setResultAuthRegister({
						error:
							result.statusCode === 404
								? 'User not found'
								: result.statusCode === 401
									? 'Password is incorrect'
									: result.statusCode === 403
										? 'Your account is disabled'
										: 'Something went wrong',
					})
					return
				}

				setResultAuthRegister({
					data: result.data,
				})
			})
		},
		[setResultAuthRegister],
	)

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!resultAuthRegister.error}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{resultAuthRegister.error}</Text>
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
