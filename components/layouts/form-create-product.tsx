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

import AssetDropdown from '@components/atoms/asset-dropdown'
import { useScrollFormError } from '@libs/hooks'
import { queryAssets } from '@libs/repo/assets'
import { queryCategories } from '@libs/repo/categories'
import { createProduct } from '@libs/repo/products'
import { CreateProductSchema, type CreateProduct } from '@libs/schema/product'
import { slugify } from '@libs/utils'

export default function FormCreateProduct(props: BoxProps) {
	const [errorCreateProduct, setErrorCreateProduct] = useState<string | null>(null)
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

	const form = useForm<CreateProduct>({
		validate: schemaResolver(CreateProductSchema, { sync: true }),
	})

	useEffect(() => {
		form.setFieldValue('inStock', true)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handlerSubmit = useCallback(async (payload: CreateProduct) => {
		setErrorCreateProduct(null)

		startActionSubmit(async () => {
			const result = await createProduct(payload)

			if (result.code === 'error') {
				setErrorCreateProduct('Failed to create data')
				return
			}

			redirect(`/admin/products/${result.data.id}`)
		})
	}, [])

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorCreateProduct}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorCreateProduct}</Text>
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
						readOnly={isLoadingSubmit}
					/>
					<TextInput
						key={form.key('slug')}
						{...form.getInputProps('slug')}
						label="Slug"
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
						readOnly={isLoadingSubmit}
					/>
					<NumberInput
						key={form.key('rating')}
						{...form.getInputProps('rating')}
						label="Rating"
						leftSection={<LuStar />}
						min={0}
						max={5}
						readOnly={isLoadingSubmit}
					/>
				</SimpleGrid>
				<Textarea
					key={form.key('description')}
					{...form.getInputProps('description')}
					label="Description"
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
						readOnly={isLoadingSubmit}
					/>
				</SimpleGrid>
			</Stack>
			<Group
				mt="xl"
				justify="flex-end"
			>
				<Button
					type="submit"
					radius="md"
					loading={isLoadingSubmit}
				>
					Create Data
				</Button>
			</Group>
		</Box>
	)
}
