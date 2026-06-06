import { clsx, type ClassValue } from 'clsx'
import type { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function generateMeta(data?: Metadata): Metadata {
	return {
		title: 'Product Search Creativeans',
		robots:
			data?.robots || process.env.NODE_ENV === 'production'
				? 'index, follow'
				: 'noindex, nofollow',
		icons: '/favicon.png',
		...data,
	}
}

export function assetUrl(asset: Pick<Asset, 'path' | 'filename'>) {
	return `${process.env.NEXT_PUBLIC_API_URL}/api/assets/${asset.path}/${asset.filename}`
}

export function currentPathname(source: string, target: string) {
	return (
		new URL(source, 'http://example.com').pathname ===
		new URL(target, 'http://example.com').pathname
	)
}

export function objectToParams(params?: object): URLSearchParams {
	const searchParams = new URLSearchParams()

	if (!params) return searchParams

	Object.entries(params).forEach(([key, value]) => {
		if (value === undefined || value === null) return

		if (Array.isArray(value)) {
			value.forEach((item) => searchParams.append(key, String(item)))
		} else {
			searchParams.set(key, String(value))
		}
	})

	return searchParams
}

export function titleCase(str: string) {
	return str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

export function slugify(str: string, delimiter?: string) {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/^\s+|\s+$/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, '')
		.replace(/\s+/g, delimiter || '-')
		.replace(/-+/g, delimiter || '-')
}

const priceFormatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
})

const ratingFormatter = new Intl.NumberFormat('en-US', {
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
})

export function displayPrice(price: number) {
	return priceFormatter.format(price)
}

export function displayRating(rating: number) {
	return `${ratingFormatter.format(rating)} / 5`
}
