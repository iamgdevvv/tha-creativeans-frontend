import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import { Plus_Jakarta_Sans } from 'next/font/google'

import Providers from '@components/providers/providers'
import { generateMeta } from '@libs/utils'

import '@mantine/carousel/styles.css'
import '@mantine/dropzone/styles.css'

import '@styles/mantine.css'

import '@styles/globals.css'

const fontBody = Plus_Jakarta_Sans({
	display: 'swap',
	variable: '--font-sans',
	preload: true,
	weight: ['200', '300', '400', '500', '600', '700', '800'],
	subsets: ['latin', 'latin-ext', 'cyrillic-ext', 'vietnamese'],
	fallback: [
		'ui-sans-serif',
		'system-ui',
		'-apple-system',
		'BlinkMacSystemFont',
		'Segoe UI',
		'Roboto',
		'Helvetica Neue',
		'Arial',
		'Noto Sans',
		'sans-serif',
		'Apple Color Emoji, Segoe UI Emoji',
		'Segoe UI Symbol',
		'Noto Color Emoji',
	],
})

export const metadata = generateMeta({
	title: {
		default: 'Creativeans',
		template: '%s | Creativeans',
	},
	robots: 'index, follow',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			{...mantineHtmlProps}
			data-scroll-behavior="smooth"
			className={fontBody.className}
			style={{
				['--font-sans' as string]: fontBody.style.fontFamily,
			}}
		>
			<head>
				<ColorSchemeScript
					defaultColorScheme="light"
					forceColorScheme="light"
				/>
			</head>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
