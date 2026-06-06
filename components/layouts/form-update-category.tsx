'use client'
import {
	Alert,
	Box,
	Button,
	Group,
	Text,
	TextInput,
	Transition,
	type BoxProps,
} from '@mantine/core'
import { schemaResolver, useForm } from '@mantine/form'
import { redirect } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'

import { useScrollFormError } from '@libs/hooks'
import { updateCategory } from '@libs/repo/categories'
import { UpdateCategorySchema, type UpdateCategory } from '@libs/schema/category'

type Props = {
	data: Category
	disabled?: boolean
} & BoxProps

export default function FormUpdateCategory({ data, disabled, ...props }: Props) {
	const [errorUpdateCategory, setErrorUpdateCategory] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<UpdateCategory>({
		validate: schemaResolver(UpdateCategorySchema, { sync: true }),
		initialValues: {
			name: data.name,
		},
	})

	const handlerSubmit = useCallback(
		async (payload: UpdateCategory) => {
			setErrorUpdateCategory(null)

			startActionSubmit(async () => {
				const result = await updateCategory(data.id, payload)

				if (result.code === 'error') {
					setErrorUpdateCategory('Failed to update data')
					return
				}

				redirect(`/admin/categories/${result.data.id}`)
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
			<Transition mounted={!!errorUpdateCategory}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorUpdateCategory}</Text>
					</Alert>
				)}
			</Transition>
			<TextInput
				key={form.key('name')}
				{...form.getInputProps('name')}
				label="Category Name"
				disabled={disabled}
				readOnly={isLoadingSubmit}
			/>
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
