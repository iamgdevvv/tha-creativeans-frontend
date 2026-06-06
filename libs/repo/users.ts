'use server'
import { redirect } from 'next/navigation'

import type {
	CreateUser,
	ParamsUser,
	ParamsUsers,
	UpdateUser,
	UpdateUserPassword,
	UpdateUserProfile,
	UpdateUserProfilePassword,
} from '@libs/schema/user'
import {
	mutateBackend,
	queriesBackend,
	queryBackend,
	type ResponseBackendData,
	type ResponseBackendError,
} from '@libs/server-functions/backend-api'
import { retrieveTokenAuth } from '@libs/server-functions/cookie-auth'
import { objectToParams } from '@libs/utils'

export async function userMe(): Promise<ResponseBackendData<UserMe> | ResponseBackendError> {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		return {
			code: 'error',
			message: 'Unauthorized',
			statusCode: 401,
		}
	}

	return await queryBackend<UserMe>('/api/users/me', {
		authorization: `Bearer ${authToken}`,
	})
}

export async function queryUsers<T = User>(params?: ParamsUsers) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await queriesBackend<T>('/api/users', {
		params: objectToParams(params),
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function queryUser<T = User>(userId: User['id'], params?: ParamsUser) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await queryBackend<T>(`/api/users/${userId}`, {
		params: objectToParams(params),
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function createUser(payload: CreateUser) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await mutateBackend<User, CreateUser>('/api/users', payload, {
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function updateUser(userId: User['id'], payload: UpdateUser) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await mutateBackend<User, UpdateUser>(`/api/users/${userId}`, payload, {
		method: 'PATCH',
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function updateUserPassword(userId: User['id'], payload: UpdateUserPassword) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await mutateBackend<unknown, UpdateUserPassword>(
		`/api/users/${userId}/password`,
		payload,
		{
			authorization: `Bearer ${authToken}`,
		},
	)

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function updateUserProfile(payload: UpdateUserProfile) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await mutateBackend<User, UpdateUserProfile>('/api/users/profile', payload, {
		method: 'PATCH',
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function updateUserProfilePassword(
	payload: Omit<UpdateUserProfilePassword, 'confirm_password'>,
) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await mutateBackend<
		unknown,
		Omit<UpdateUserProfilePassword, 'confirm_password'>
	>('/api/users/profile/password', payload, {
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}

export async function deleteUser(userId: User['id']) {
	const authToken = await retrieveTokenAuth()

	if (!authToken) {
		redirect('/login')
	}

	const result = await queryBackend(`/api/users/${userId}`, {
		method: 'DELETE',
		authorization: `Bearer ${authToken}`,
	})

	if ([401, 403].includes(result.statusCode)) {
		redirect('/admin/logout')
	}

	return result
}
