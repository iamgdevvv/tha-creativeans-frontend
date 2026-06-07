'use client'
import {
	Alert,
	Box,
	Button,
	Checkbox,
	Group,
	MultiSelect,
	NumberInput,
	SimpleGrid,
	Stack,
	Text,
	Textarea,
	TextInput,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { useSetState } from '@mantine/hooks'
import { redirect } from 'next/navigation'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { LuStar } from 'react-icons/lu'
import { RiAiGenerateText } from 'react-icons/ri'
import * as z from 'zod'

import AssetDropdown from '@components/atoms/asset-dropdown'
import { useScrollFormError } from '@libs/hooks'
import { queryAssets } from '@libs/repo/assets'
import { queryCategories } from '@libs/repo/categories'
import { updateProduct } from '@libs/repo/products'
import { CreateProductSchema, UpdateProductSchema } from '@libs/schema/product'
import { slugify } from '@libs/utils'

type Props = {
	data: DetailProduct
	disabled?: boolean
} & BoxProps

const PayloadSchema = z.object({
	...UpdateProductSchema.omit({
		categories: true,
		thumbnails: true,
	}).shape,
	categories: CreateProductSchema.shape.categories.optional(),
	thumbnails: CreateProductSchema.shape.thumbnails.optional(),
})

type Payload = z.infer<typeof PayloadSchema>

export default function FormUpdateProduct({ data, disabled, ...props }: Props) {
	const [errorUpdateProduct, setErrorUpdateProduct] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()
	const [isLoadingQuery, startActionQuery] = useTransition()
	const [{ categories, assets }, setQueryLoader] = useSetState<{
		categories: Category[]
		assets: Pick<Asset, 'path' | 'filename'>[]
	}>({
		categories: [],
		assets: [],
	})

	useEffect(() => {
		startActionQuery(async () => {
			const [resultCategories, resultAssets] = await Promise.all([
				queryCategories({
					limit: 10000,
				}),
				queryAssets<Pick<Asset, 'path' | 'filename'>>({
					select: ['filename', 'path'],
					desc: ['createdAt'],
					path: 'products',
					limit: 10000,
				}),
			])

			const _categories: Category[] = []
			const _assets: Pick<Asset, 'path' | 'filename'>[] = []

			if (resultCategories.code === 'success') {
				_categories.push(...resultCategories.data)
			}

			if (resultAssets.code === 'success') {
				_assets.push(...resultAssets.data)
			}

			setQueryLoader({
				categories: _categories,
				assets: _assets,
			})
		})

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const form = useForm<Payload>({
		validate: schemaResolver(PayloadSchema, { sync: true }),
		initialValues: {
			name: data.name,
			slug: data.slug,
			description: data.description,
			price: data.price,
			inStock: data.inStock,
			rating: data.rating,
			categories: data.productCategories
				? data.productCategories.map((item) => item.categoryId)
				: undefined,
			thumbnails: data.productThumbnails
				? data.productThumbnails.map((item) => item.assetId)
				: undefined,
		},
	})

	const handlerSubmit = useCallback(
		async (payload: Payload) => {
			setErrorUpdateProduct(null)

			startActionSubmit(async () => {
				const categoryCurrentIds: string[] =
					data.productCategories?.map((item) => item.categoryId) ?? []
				const categoryAddIds: string[] = []
				const categoryRemoveIds: string[] = []
				const thumbnailCurrentIds: string[] =
					data.productThumbnails?.map((item) => item.assetId) ?? []
				const thumbnailAddIds: string[] = []
				const thumbnailRemoveIds: string[] = []

				if (payload.categories?.length) {
					categoryCurrentIds.forEach((id) => {
						if (!payload.categories?.includes(id)) {
							categoryRemoveIds.push(id)
						}
					})

					payload.categories?.forEach((id) => {
						if (!categoryCurrentIds.includes(id)) {
							categoryAddIds.push(id)
						}
					})
				}

				if (payload.thumbnails?.length) {
					thumbnailCurrentIds.forEach((id) => {
						if (!payload.thumbnails?.includes(id)) {
							thumbnailRemoveIds.push(id)
						}
					})

					payload.thumbnails?.forEach((id) => {
						if (!thumbnailCurrentIds.includes(id)) {
							thumbnailAddIds.push(id)
						}
					})
				}

				const result = await updateProduct(data.id, {
					...payload,
					categories: {
						add: categoryAddIds,
						remove: categoryRemoveIds,
					},
					thumbnails: {
						add: thumbnailAddIds,
						remove: thumbnailRemoveIds,
					},
				})

				if (result.code === 'error') {
					setErrorUpdateProduct('Failed to update data')
					return
				}

				redirect(`/admin/products/${result.data.id}`)
			})
		},
		[data],
	)

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorUpdateProduct}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorUpdateProduct}</Text>
					</Alert>
				)}
			</Transition>
			<Stack>
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
						disabled={disabled}
						readOnly={isLoadingSubmit}
					/>
					<TextInput
						key={form.key('slug')}
						{...form.getInputProps('slug')}
						label="Slug"
						disabled={disabled}
						readOnly={isLoadingSubmit}
						rightSection={<RiAiGenerateText />}
						rightSectionPointerEvents="auto"
						rightSectionProps={{
							className: 'cursor-pointer',
							onClick: () => {
								if (form.values.name) {
									form.setFieldValue('slug', slugify(form.values.name))
								} else {
									form.setFieldError('name', 'Name is required')
								}
							},
						}}
					/>
				</SimpleGrid>
				<SimpleGrid
					cols={{
						base: 1,
						sm: 3,
					}}
				>
					<Checkbox
						key={form.key('inStock')}
						{...form.getInputProps('inStock', { type: 'checkbox' })}
						label="Stock Available"
						disabled={disabled}
						readOnly={isLoadingSubmit}
						mt={{
							sm: 4,
						}}
					/>
					<NumberInput
						key={form.key('price')}
						{...form.getInputProps('price')}
						label="Price"
						leftSection="$"
						allowNegative={false}
						disabled={disabled}
						readOnly={isLoadingSubmit}
					/>
					<NumberInput
						key={form.key('rating')}
						{...form.getInputProps('rating')}
						label="Rating"
						leftSection={<LuStar />}
						min={0}
						max={5}
						disabled={disabled}
						readOnly={isLoadingSubmit}
					/>
				</SimpleGrid>
				<Textarea
					key={form.key('description')}
					{...form.getInputProps('description')}
					label="Description"
					disabled={disabled}
					readOnly={isLoadingSubmit}
				/>
				<SimpleGrid
					cols={{
						base: 1,
						sm: 2,
					}}
				>
					<MultiSelect
						key={form.key('categories')}
						{...form.getInputProps('categories')}
						label="Categories"
						loading={isLoadingQuery}
						disabled={disabled}
						readOnly={isLoadingSubmit}
						clearable
						searchable
						limit={20}
						hidePickedOptions
						data={categories.map((category) => ({
							value: category.id,
							label: category.name,
						}))}
					/>
					<AssetDropdown
						key={form.key('thumbnails')}
						{...form.getInputProps('thumbnails')}
						data={assets}
						label="Thumbnails"
						loading={isLoadingQuery}
						disabled={disabled}
						readOnly={isLoadingSubmit}
					/>
				</SimpleGrid>
			</Stack>
			{!disabled ? (
				<Group
					mt="xl"
					justify="flex-end"
				>
					<Button
						type="submit"
						radius="md"
						loading={isLoadingSubmit}
					>
						Update Data
					</Button>
				</Group>
			) : null}
		</Box>
	)
}
