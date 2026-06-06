'use client'
import { nprogress } from '@mantine/nprogress'
import { usePathname, useRouter as useRouterOriginal } from 'next/navigation'

export function useRouter(): ReturnType<typeof useRouterOriginal> {
	const router = useRouterOriginal()
	const pathname = usePathname()

	return {
		...router,
		push: (href, options) => {
			if (pathname !== href) {
				nprogress.start()

				setTimeout(() => nprogress.complete(), 1000)
			}

			router.push(href, options)
		},
		replace: (href, options) => {
			if (pathname !== href) {
				nprogress.start()

				setTimeout(() => nprogress.complete(), 1000)
			}

			router.replace(href, options)
		},
	}
}
