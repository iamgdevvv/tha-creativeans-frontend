import * as z from 'zod'

export const AuthLoginSchema = z.object({
	email: z.string(),
	password: z.string(),
})

export const AuthRegisterSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
})

export type AuthLogin = z.infer<typeof AuthLoginSchema>

export type AuthRegister = z.infer<typeof AuthRegisterSchema>
