import * as z from 'zod'

export const ParamsCategorySchema = z.object({
	select: z
		.enum(['id', 'name'] satisfies (keyof Category)[])
		.array()
		.optional(),
	include: z.enum(['productCategories']).array().optional(),
})

export const ParamsCategoriesSchema = z.object({
	...ParamsCategorySchema.shape,
	name: z.string().optional(),
	desc: z
		.enum(['id', 'name'] satisfies (keyof Category)[])
		.array()
		.optional(),
	asc: z
		.enum(['id', 'name'] satisfies (keyof Category)[])
		.array()
		.optional(),
	limit: z.number().optional(),
	skip: z.number().optional(),
	q: z.string().optional(),
})

export const CreateCategorySchema = z.object({
	name: z.string(),
}) satisfies z.ZodType<Omit<Category, 'id'>>

export const UpdateCategorySchema = z.object({
	name: z.string(),
}) satisfies z.ZodType<Omit<Category, 'id'>>

export type ParamsCategories = z.infer<typeof ParamsCategoriesSchema>
export type ParamsCategory = z.infer<typeof ParamsCategorySchema>
export type CreateCategory = z.infer<typeof CreateCategorySchema>
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>
