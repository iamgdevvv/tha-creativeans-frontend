'use client'
import { useHash, useShallowEffect } from '@mantine/hooks'
import { NavigationProgress, nprogress } from '@mantine/nprogress'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ClientProvider() {
	const [hash] = useHash()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	useShallowEffect(() => {
		nprogress.complete()

		scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}, [hash, pathname, searchParams])

	useShallowEffect(() => {
		if (hash) {
			const element = document.getElementById(hash.slice(1))

			if (element) {
				const timerScroll = setTimeout(() => {
					scrollTo({
						top: element.offsetTop,
						behavior: 'smooth',
					})
				}, 100)

				return () => clearTimeout(timerScroll)
			}

			nprogress.complete()
		}
	}, [hash])

	return (
		<NavigationProgress
			aria-label="NavigationProgress"
			className="site-progress"
		/>
	)
}
