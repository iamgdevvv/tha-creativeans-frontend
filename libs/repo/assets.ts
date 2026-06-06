'use server'
import { redirect } from 'next/navigation'

import type { ParamsAssets, UploadAsset } from '@libs/schema/asset'
import { mutateBackend, queriesBackend, queryBackend } from '@libs/server-functions/backend-api'
import { retrieveTokenAuth } from '@libs/server-functions/cookie-auth'
import { objectToParams } from '@libs/utils'

export async function queryAssets<T = Asset>(params?: ParamsAssets) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await queriesBackend<T>('/api/assets', {
		authorization: `Bearer ${authToken}`,
		params: objectToParams(params),
	})

	return result
}

export async function uploadAsset(payload: UploadAsset) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const formData = new FormData()

	for (const [key, value] of Object.entries(payload)) {
		formData.append(key, value)
	}

	const result = await mutateBackend<Asset, FormData>('/api/assets', formData, {
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function deleteAsset(params: Pick<Asset, 'filename' | 'path'>) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await queryBackend(`/api/assets/${params.path}/${params.filename}`, {
		method: 'DELETE',
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}
