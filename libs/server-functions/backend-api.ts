'use server'

type ResponseBackend = {
	code: 'success'
	message: string
	statusCode: number
}

export type ResponseBackendData<T> = ResponseBackend & {
	data: T
}

type ResponseBackendPagination<T> = {
	code: 'success'
	message: string
	statusCode: number
	total: number
	skip: number
	limit: number
	data: T[]
}

export type ResponseBackendError = {
	code: 'error'
	message: string
	statusCode: number
}

async function fetchBackend<T>(
	endpoint: string,
	options?: {
		method?: RequestInit['method']
		headers?: Headers
		params?: URLSearchParams
		authorization?: string
		body?: RequestInit['body']
	},
) {
	try {
		const url = new URL(process.env.NEXT_PUBLIC_API_URL + endpoint)

		const headers = new Headers(options?.headers)

		if (options?.body && !(options.body instanceof FormData)) {
			headers.set('Content-Type', 'application/json')
		}

		if (options?.authorization) {
			headers.set('Authorization', options.authorization)
		}

		if (options?.params) {
			url.search = options.params.toString()
		}

		const response = await fetch(url.toString(), {
			method: options?.method,
			headers,
			body: options?.body,
			cache: 'no-cache',
		})

		if (!response.ok) {
			try {
				const resultError = await response.json()

				return resultError as ResponseBackendError
			} catch {
				throw new Error(response.statusText)
			}
		}

		return (await response.json()) as T
	} catch {
		return {
			code: 'error',
			message: 'Something went wrong',
			statusCode: 500,
		} satisfies ResponseBackendError
	}
}

export async function queryBackend<T>(
	baseUrl: string,
	options?: {
		method?: RequestInit['method']
		headers?: Headers
		params?: URLSearchParams
		authorization?: string
	},
) {
	return await fetchBackend<ResponseBackendData<T>>(baseUrl, {
		method: options?.method,
		headers: options?.headers,
		params: options?.params,
		authorization: options?.authorization,
	})
}

export async function queriesBackend<T>(
	baseUrl: string,
	options?: {
		headers?: Headers
		params?: URLSearchParams
		authorization?: string
	},
) {
	return await fetchBackend<ResponseBackendPagination<T>>(baseUrl, {
		headers: options?.headers,
		params: options?.params,
		authorization: options?.authorization,
	})
}

export async function mutateBackend<T, K extends object, V extends object = object>(
	baseUrl: string,
	payload: K,
	options?: {
		method?: RequestInit['method']
		headers?: Headers
		params?: URLSearchParams
		authorization?: string
	},
) {
	return await fetchBackend<ResponseBackendData<T> & V>(baseUrl, {
		method: options?.method || 'POST',
		headers: options?.headers,
		params: options?.params,
		authorization: options?.authorization,
		body: payload instanceof FormData ? payload : JSON.stringify(payload),
	})
}
