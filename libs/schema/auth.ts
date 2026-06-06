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

export const AuthLoginGoogleSchema = z.object({
	state: z.string().optional(),
	code: z.string(),
	scope: z.string().optional(),
	authuser: z.string().optional(),
	prompt: z.string().optional(),
})

export type AuthLogin = z.infer<typeof AuthLoginSchema>
export type AuthRegister = z.infer<typeof AuthRegisterSchema>
export type AuthLoginGoogle = z.infer<typeof AuthLoginGoogleSchema>
