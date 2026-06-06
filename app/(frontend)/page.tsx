import { generateMeta } from '@libs/utils'

export const dynamic = 'force-dynamic'

export default function Home() {
	return (
		<>
			<h1>Hello World</h1>
		</>
	)
}

export const metadata = generateMeta()
