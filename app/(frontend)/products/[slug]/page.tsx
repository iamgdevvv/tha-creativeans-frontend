import { Carousel, CarouselSlide } from '@mantine/carousel'
import { Badge, Box, Container, Flex, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { FaStar, FaStarHalfStroke } from 'react-icons/fa6'

import Image from '@components/atoms/image'
import { queryProductBySlug } from '@libs/repo/products'
import { displayPrice } from '@libs/utils'

export const dynamic = 'force-dynamic'

export default async function DetailProduct({ params }: PageProps<'/products/[slug]'>) {
	const { slug } = await params
	const resultProduct = await queryProductBySlug(slug, {
		afterLogin: `/products/${slug}`,
	})

	if (resultProduct.code === 'error') {
		redirect('/404')
	}

	const product = resultProduct.data

	return (
		<Container
			my={{
				base: 'xl',
				md: 80,
			}}
		>
			<SimpleGrid
				spacing="xl"
				cols={{
					base: 1,
					md: 2,
				}}
			>
				<Stack gap="sm">
					<Box
						pos="sticky"
						top={120}
						h={{
							base: 360,
							md: 560,
							lg: 620,
						}}
					>
						{product.thumbnails.length > 1 ? (
							<Carousel
								slideSize="100%"
								h="100%"
								height="100%"
								slideGap="xs"
							>
								{product.thumbnails.map((thumbnail) => (
									<CarouselSlide key={thumbnail}>
										<Image
											src={thumbnail}
											width={600}
											height={600}
											w="100%"
											h="100%"
											bg="gray.1"
										/>
									</CarouselSlide>
								))}
							</Carousel>
						) : (
							<Image
								src={product.thumbnails[0]}
								width={600}
								height={600}
								w="100%"
								h="100%"
								bg="gray.1"
							/>
						)}
					</Box>
				</Stack>
				<Stack gap="xl">
					<Title>{product.name}</Title>
					<Stack gap="xs">
						<Flex c="yellow">
							{Array.from({ length: 5 }).map((_, index) => {
								if (
									product.rating % 1 !== 0 &&
									Math.floor(product.rating) === index
								) {
									return (
										<FaStarHalfStroke
											key={`rate-${index}`}
											size={20}
										/>
									)
								}

								if (product.rating < index + 1) {
									return (
										<FaStar
											key={`rate-${index}`}
											size={20}
										/>
									)
								}

								return (
									<FaStar
										key={`rate-${index}`}
										size={20}
									/>
								)
							})}
						</Flex>
						<Text
							span
							fw={700}
							fz="xl"
						>
							{displayPrice(product.price)}
						</Text>
					</Stack>
					<Group gap="xs">
						<Text span>Stock Available: </Text>
						<Badge
							variant="light"
							size="lg"
							color={product.inStock ? 'green' : 'red'}
						>
							{product.inStock ? 'Yes' : 'No'}
						</Badge>
					</Group>
					{product.description ? (
						<Stack gap="xs">
							<Text
								span
								fw={600}
							>
								Description
							</Text>
							<Text className="whitespace-pre-line">{product.description}</Text>
						</Stack>
					) : null}
				</Stack>
			</SimpleGrid>
		</Container>
	)
}

export async function generateMetadata({
	params,
}: PageProps<'/products/[slug]'>): Promise<Metadata> {
	const { slug } = await params
	const resultProduct = await queryProductBySlug(slug, {
		afterLogin: `/products/${slug}`,
	})

	if (resultProduct.code === 'error') {
		return {}
	}

	const product = resultProduct.data

	return {
		title: product.name,
		description: product.description,
		icons: product.thumbnails,
	}
}
