import * as z from 'zod'

export const ParamsProductSchema = z.object({
	select: z
		.enum([
			'id',
			'name',
			'slug',
			'price',
			'description',
			'rating',
			'inStock',
			'userId',
			'createdAt',
			'updatedAt',
		] satisfies (keyof Product)[])
		.array()
		.optional(),
	include: z.enum(['productThumbnails', 'productCategories']).array().optional(),
})

export const ParamsProductsSchema = z.object({
	...ParamsProductSchema.shape,
	name: z.string().optional(),
	slug: z.string().optional(),
	price: z.number().optional(),
	description: z.string().optional(),
	rating: z.number().min(0).max(5).optional(),
	inStock: z.boolean().optional(),
	userId: z.string().optional(),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
	categories: z.string().array().optional(),
	desc: z
		.enum([
			'name',
			'slug',
			'price',
			'description',
			'rating',
			'inStock',
			'userId',
			'createdAt',
			'updatedAt',
		])
		.array()
		.optional(),
	asc: z
		.enum([
			'name',
			'slug',
			'price',
			'description',
			'rating',
			'inStock',
			'userId',
			'createdAt',
			'updatedAt',
		])
		.array()
		.optional(),
	limit: z.number().optional(),
	skip: z.number().optional(),
	q: z.string().optional(),
})

export const ParamsProductsPublicSchema = z.object({
	name: z.string().optional(),
	slug: z.string().optional(),
	price: z.number().optional(),
	description: z.string().optional(),
	rating: z.number().min(0).max(5).optional(),
	inStock: z.boolean().optional(),
	createdAt: z.coerce.date().optional(),
	updatedAt: z.coerce.date().optional(),
	categories: z.string().array().optional(),
	desc: z
		.enum([
			'name',
			'slug',
			'price',
			'description',
			'rating',
			'inStock',
			'userId',
			'createdAt',
			'updatedAt',
		])
		.array()
		.optional(),
	asc: z
		.enum([
			'name',
			'slug',
			'price',
			'description',
			'rating',
			'inStock',
			'userId',
			'createdAt',
			'updatedAt',
		])
		.array()
		.optional(),
	limit: z.number().optional(),
	skip: z.number().optional(),
	q: z.string().optional(),
})

export const CreateProductSchema = z.object({
	name: z.string(),
	slug: z.string(),
	price: z.number(),
	description: z.string(),
	rating: z.number().min(0).max(5),
	inStock: z.boolean(),
	categories: z.string().array().optional(),
	thumbnails: z.string().array().optional(),
}) satisfies z.ZodType<
	Omit<Product, 'id' | 'userId' | 'createdAt' | 'updatedAt'> & {
		categories?: string[]
		thumbnails?: string[]
	}
>

export const UpdateProductSchema = z
	.object({
		name: z.string(),
		slug: z.string(),
		price: z.number(),
		description: z.string(),
		rating: z.number().min(0).max(5),
		inStock: z.boolean(),
		categories: z
			.object({
				add: z.string().array().optional(),
				remove: z.string().array().optional(),
			})
			.optional(),
		thumbnails: z
			.object({
				add: z.string().array().optional(),
				remove: z.string().array().optional(),
			})
			.optional(),
	})
	.partial() satisfies z.ZodType<
	Partial<Omit<Product, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> & {
		categories?: {
			add?: string[]
			remove?: string[]
		}
		thumbnails?: {
			add?: string[]
			remove?: string[]
		}
	}
>

export type ParamsProductsPublic = z.infer<typeof ParamsProductsPublicSchema>
export type ParamsProducts = z.infer<typeof ParamsProductsSchema>
export type ParamsProduct = z.infer<typeof ParamsProductSchema>
export type CreateProduct = z.infer<typeof CreateProductSchema>
export type UpdateProduct = z.infer<typeof UpdateProductSchema>
