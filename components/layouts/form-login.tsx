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
import { authLogin } from '@libs/repo/auth'
import { AuthLoginSchema, type AuthLogin } from '@libs/schema/auth'

export default function FormLogin({
	redirectUrl,
	...props
}: BoxProps & {
	redirectUrl?: string
}) {
	const [errorAuthLogin, setErrorAuthLogin] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<AuthLogin>({
		validate: schemaResolver(AuthLoginSchema, { sync: true }),
	})

	const handlerSubmit = useCallback(
		async (payload: AuthLogin) => {
			setErrorAuthLogin(null)

			startActionSubmit(async () => {
				const result = await authLogin(payload)

				if (result.code === 'error') {
					setErrorAuthLogin(
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

				if (redirectUrl) {
					redirect(redirectUrl)
				} else if (['ADMIN', 'STAFF'].includes(result.data.role)) {
					redirect('/admin')
				} else {
					redirect('/dashboard')
				}
			})
		},
		[redirectUrl],
	)

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorAuthLogin}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorAuthLogin}</Text>
					</Alert>
				)}
			</Transition>
			<TextInput
				key={form.key('email')}
				{...form.getInputProps('email')}
				label="Email"
				placeholder="example@email.com"
				readOnly={isLoadingSubmit}
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
