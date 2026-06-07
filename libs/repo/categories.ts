'use server'
import { redirect } from 'next/navigation'

import type { CreateCategory, ParamsCategories, ParamsCategory } from '@libs/schema/category'
import { mutateBackend, queriesBackend, queryBackend } from '@libs/server-functions/backend-api'
import { retrieveTokenAuth } from '@libs/server-functions/cookies'
import { objectToParams } from '@libs/utils'

export async function queryCategories<T = Category>(params?: ParamsCategories) {
	const result = await queriesBackend<T>('/api/categories', {
		params: objectToParams(params),
	})

	return result
}

export async function queryCategory(categoryId: Category['id'], params?: ParamsCategory) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await queryBackend<Category>(`/api/categories/${categoryId}`, {
		params: objectToParams(params),
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}

export async function createCategory(payload: CreateCategory) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await mutateBackend<Category, CreateCategory>('/api/categories', payload, {
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}

export async function updateCategory(categoryId: Category['id'], payload: CreateCategory) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await mutateBackend<Category, CreateCategory>(
		`/api/categories/${categoryId}`,
		payload,
		{
			method: 'PATCH',
			authorization: `Bearer ${authToken}`,
		},
	)

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}

export async function deleteCategory(categoryId: Category['id']) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await queryBackend(`/api/categories/${categoryId}`, {
		method: 'DELETE',
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}
