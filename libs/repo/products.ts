'use server'
import { redirect } from 'next/navigation'

import type {
	CreateProduct,
	ParamsProduct,
	ParamsProducts,
	ParamsProductsPublic,
	UpdateProduct,
} from '@libs/schema/product'
import { mutateBackend, queriesBackend, queryBackend } from '@libs/server-functions/backend-api'
import { retrieveTokenAuth } from '@libs/server-functions/cookies'
import { objectToParams } from '@libs/utils'

export async function queryProductsPublic<T = ProductPublic>(params?: ParamsProductsPublic) {
	const result = await queriesBackend<T>('/api/products/public', {
		params: objectToParams(params),
	})

	return result
}

export async function queryProductBySlug(
	slug: Product['slug'],
	redirectUrl?: {
		afterLogin?: string
		afterLogout?: string
	},
) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect(
			'/auth/login' +
				(redirectUrl?.afterLogin ? `?redirectUrl=${redirectUrl.afterLogin}` : ''),
		)
	}

	const result = await queryBackend<ProductPublic>(`/api/products/public/${slug}`, {
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect(
			'/logout' + (redirectUrl?.afterLogout ? `?redirectUrl=${redirectUrl.afterLogout}` : ''),
		)
	}

	return result
}

export async function queryProducts<T = Product>(params?: ParamsProducts) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await queriesBackend<T>('/api/products', {
		params: objectToParams(params),
		authorization: `Bearer ${authToken}`,
	})

	return result
}

export async function queryProduct<T = Product>(productId: Product['id'], params?: ParamsProduct) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await queryBackend<T>(`/api/products/${productId}`, {
		params: objectToParams(params),
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}

export async function createProduct(payload: CreateProduct) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await mutateBackend<Product, CreateProduct>('/api/products', payload, {
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}

export async function updateProduct(productId: Product['id'], payload: UpdateProduct) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await mutateBackend<Product, UpdateProduct>(
		`/api/products/${productId}`,
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

export async function deleteProduct(productId: Product['id']) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/auth/login')
	}

	const result = await queryBackend(`/api/products/${productId}`, {
		method: 'DELETE',
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/logout')
	}

	return result
}
