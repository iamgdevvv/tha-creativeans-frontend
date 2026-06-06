'use client'
import { Anchor, type AnchorProps } from '@mantine/core'
import { nprogress } from '@mantine/nprogress'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, type ComponentProps } from 'react'

type BaseLinkProps = {
	label?: string | null
	href?: string | null
	openNewTab?: boolean | null
} & Omit<ComponentProps<typeof NextLink>, 'href' | 'label'>

type Props = BaseLinkProps & AnchorProps

export default function Link(props: Props) {
	return (
		<Anchor
			underline="never"
			{...props}
			component={BaseLink}
		/>
	)
}

export function BaseLink({
	label,
	href,
	openNewTab,
	target,
	children,
	prefetch,
	...props
}: BaseLinkProps) {
	const pathname = usePathname()

	const handlerScrollToHash = useCallback((hash: string) => {
		const targetScroll = document.getElementById(hash.slice(1))

		if (targetScroll) {
			const timerScroll = setTimeout(() => {
				scrollTo({
					top: targetScroll.offsetTop,
					behavior: 'smooth',
				})
			}, 100)

			return () => clearTimeout(timerScroll)
		}
	}, [])

	return (
		<NextLink
			{...props}
			href={href || '#'}
			target={openNewTab ? '_blank' : target}
			prefetch={prefetch || false}
			onNavigate={(e) => {
				if (href) {
					const absoluteUrl = new URL(href, window.location.origin)

					if (absoluteUrl.hash.length && absoluteUrl.pathname === pathname) {
						handlerScrollToHash(absoluteUrl.hash)
					} else if (href === '#') {
						scrollTo({
							top: 0,
							behavior: 'smooth',
						})
					} else {
						nprogress.start()

						setTimeout(() => nprogress.complete(), 1000)
					}
				}

				props.onNavigate?.(e)
			}}
		>
			{label || children}
		</NextLink>
	)
}
