import { MantineProvider } from '@mantine/core'
import { Suspense, type PropsWithChildren } from 'react'

import ClientProvider from '@components/providers/client-provider'
import theme from '@libs/modules/theme'

export default function Providers({ children }: PropsWithChildren) {
	return (
		<MantineProvider
			theme={theme}
			defaultColorScheme="light"
			forceColorScheme="light"
		>
			<Suspense>
				<ClientProvider />
			</Suspense>
			{children}
		</MantineProvider>
	)
}
