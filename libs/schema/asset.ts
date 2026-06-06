import * as z from 'zod'

export const AssetPathSchema = z.enum(['products'])

export const ParamsAssetsSchema = z.object({
	select: z
		.enum(['filename', 'path', 'userId', 'createdAt'] satisfies (keyof Asset)[])
		.array()
		.optional(),
	path: AssetPathSchema.optional(),
	filename: z.string().optional(),
	userId: z.string().optional(),
	createdAt: z.coerce.date().optional(),
	desc: z
		.enum(['filename', 'path', 'userId', 'createdAt'] satisfies (keyof Asset)[])
		.array()
		.optional(),
	asc: z
		.enum(['filename', 'path', 'userId', 'createdAt'] satisfies (keyof Asset)[])
		.array()
		.optional(),
	limit: z.number().optional(),
	skip: z.number().optional(),
	q: z.string().optional(),
})

export const UploadAssetSchema = z.object({
	path: z.enum(['products']),
	file: z.file(),
}) satisfies z.ZodType<
	Pick<Asset, 'path'> & {
		file: File
	}
>

export type ParamsAssets = z.infer<typeof ParamsAssetsSchema>
export type UploadAsset = z.infer<typeof UploadAssetSchema>
