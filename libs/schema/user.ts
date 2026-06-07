import * as z from 'zod'

export const UserRoleSchema = z.enum(['ADMIN', 'STAFF', 'CUSTOMER'] satisfies UserRole[])

export const ParamsUserSchema = z.object({
	select: z
		.enum([
			'id',
			'name',
			'email',
			'role',
			'isActive',
			'createdAt',
			'updatedAt',
		] satisfies (keyof User)[])
		.array()
		.optional(),
	include: z.enum(['userThumbnails', 'userCategories']).array().optional(),
})

export const ParamsUsersSchema = z.object({
	...ParamsUserSchema.shape,
	name: z.string().optional(),
	email: z.string().optional(),
	role: UserRoleSchema.optional(),
	isActive: z.boolean().optional(),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
	desc: z
		.enum([
			'name',
			'email',
			'role',
			'isActive',
			'createdAt',
			'updatedAt',
		] satisfies (keyof User)[])
		.array()
		.optional(),
	asc: z
		.enum([
			'name',
			'email',
			'role',
			'isActive',
			'createdAt',
			'updatedAt',
		] satisfies (keyof User)[])
		.array()
		.optional(),
	limit: z.number().optional(),
	skip: z.number().optional(),
	q: z.string().optional(),
})

export const CreateUserSchema = z.object({
	name: z.string(),
	email: z.email(),
	isActive: z.boolean(),
	role: UserRoleSchema,
	password: z.string().nonempty(),
}) satisfies z.ZodType<
	Omit<User, 'id' | 'userId' | 'createdAt' | 'updatedAt'> & {
		password: string
	}
>

export const UpdateUserSchema = CreateUserSchema.omit({
	password: true,
}).partial() satisfies z.ZodType<Partial<Omit<User, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>>

export const UpdateUserPasswordSchema = z.object({
	password: z.string().nonempty(),
}) satisfies z.ZodType<{
	password: string
}>

export const UpdateUserProfileSchema = CreateUserSchema.omit({
	password: true,
	isActive: true,
	role: true,
}).partial() satisfies z.ZodType<Partial<Pick<User, 'name' | 'email'>>>

export const UpdateUserProfilePasswordSchema = z
	.object({
		password: z.string().nonempty(),
		new_password: z.string().nonempty(),
		confirm_password: z.string().nonempty(),
	})
	.refine(({ new_password, confirm_password }) => new_password === confirm_password, {
		path: ['confirm_password'],
		message: 'Passwords do not match',
	}) satisfies z.ZodType<{
	password: string
	confirm_password: string
	new_password: string
}>

export type ParamsUsers = z.infer<typeof ParamsUsersSchema>
export type ParamsUser = z.infer<typeof ParamsUserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UpdateUserPassword = z.infer<typeof UpdateUserPasswordSchema>
export type UpdateUserProfile = z.infer<typeof UpdateUserProfileSchema>
export type UpdateUserProfilePassword = z.infer<typeof UpdateUserProfilePasswordSchema>
