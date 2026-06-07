import {
	AspectRatio,
	Button,
	Card,
	CardSection,
	Group,
	Text,
	Title,
	type CardProps,
} from '@mantine/core'

import Image from '@components/atoms/image'
import Link from '@components/atoms/link'

export default function ProductCard({
	data,
	...props
}: CardProps & {
	data: ProductPublic
}) {
	return (
		<Card
			withBorder
			pt={0}
			{...props}
		>
			<CardSection
				component={Link}
				href={`/products/${data.slug}`}
			>
				<AspectRatio ratio={3 / 4}>
					<Image
						src={data.thumbnails.length ? data.thumbnails[0] : undefined}
						width={400}
						height={400}
						alt={data.name}
					/>
				</AspectRatio>
			</CardSection>

			<Title
				order={3}
				fz="lg"
				mt="md"
				lineClamp={2}
			>
				{data.name}
			</Title>

			{data.description ? (
				<Text
					mt="xs"
					size="sm"
					c="dimmed"
					lineClamp={4}
				>
					{data.description}
				</Text>
			) : null}

			<Group
				justify="flex-end"
				mt="auto"
				pt="xl"
			>
				<Button
					component={Link}
					href={`/products/${data.slug}`}
					variant="light"
					size="xs"
				>
					Discover More
				</Button>
			</Group>
		</Card>
	)
}
