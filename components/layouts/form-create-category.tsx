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
import { createCategory } from '@libs/repo/categories'
import { CreateCategorySchema, type CreateCategory } from '@libs/schema/category'

export default function FormCreateCategory(props: BoxProps) {
	const [errorCreateCategory, setErrorCreateCategory] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()

	const form = useForm<CreateCategory>({
		validate: schemaResolver(CreateCategorySchema, { sync: true }),
	})

	const handlerSubmit = useCallback(async (payload: CreateCategory) => {
		setErrorCreateCategory(null)

		startActionSubmit(async () => {
			const result = await createCategory(payload)

			if (result.code === 'error') {
				setErrorCreateCategory('Failed to create data')
				return
			}

			redirect(`/admin/categories/${result.data.id}`)
		})
	}, [])

	const scrollFormError = useScrollFormError()

	return (
		<Box
			{...props}
			component="form"
			onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError())}
		>
			<Transition mounted={!!errorCreateCategory}>
				{(styleTransition) => (
					<Alert
						variant="light"
						color="red"
						mb="md"
						p="xs"
						style={styleTransition}
					>
						<Text fz="sm">{errorCreateCategory}</Text>
					</Alert>
				)}
			</Transition>
			<TextInput
				key={form.key('name')}
				{...form.getInputProps('name')}
				label="Category Name"
				readOnly={isLoadingSubmit}
			/>
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
