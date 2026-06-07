import { Group, SimpleGrid, Stack, Text, ThemeIcon, Title } from '@mantine/core'
import { AiFillProduct, AiOutlineProduct } from 'react-icons/ai'
import { BiCategory, BiSolidCategory } from 'react-icons/bi'
import { MdOutlinePermMedia } from 'react-icons/md'

import Link from '@components/atoms/link'

export const dynamic = 'force-dynamic'

export default async function Admin() {
	return (
		<>
			<Group>
				<Title fz="xl">Admin</Title>
				<Text
					display="block"
					component="span"
					size="xs"
					c="gray"
					ml="auto"
				>
					Quick Actions
				</Text>
			</Group>
			<SimpleGrid
				mt="xl"
				cols={{
					base: 2,
					md: 3,
				}}
				spacing={{
					base: 'lg',
					md: 'xl',
				}}
			>
				<Link
					href="/admin/assets"
					bd="1px solid gray.4"
					bdrs="lg"
					p={{
						base: 'md',
						md: 'lg',
					}}
				>
					<Stack gap="xs">
						<ThemeIcon
							size="xl"
							variant="light"
							bg="primary.0"
						>
							<MdOutlinePermMedia size={20} />
						</ThemeIcon>
						<Title
							order={3}
							fz="md"
							c="black"
							fw={600}
						>
							View assets
						</Title>
					</Stack>
				</Link>
				<Link
					href="/admin/products"
					bd="1px solid gray.4"
					bdrs="lg"
					p={{
						base: 'md',
						md: 'lg',
					}}
				>
					<Stack gap="xs">
						<ThemeIcon
							size="xl"
							variant="light"
							bg="primary.0"
						>
							<AiOutlineProduct size={20} />
						</ThemeIcon>
						<Title
							order={3}
							fz="md"
							c="black"
							fw={600}
						>
							View products
						</Title>
					</Stack>
				</Link>
				<Link
					href="/admin/categories"
					bd="1px solid gray.4"
					bdrs="lg"
					p={{
						base: 'md',
						md: 'lg',
					}}
				>
					<Stack gap="xs">
						<ThemeIcon
							size="xl"
							variant="light"
							bg="primary.0"
						>
							<BiCategory size={20} />
						</ThemeIcon>
						<Title
							order={3}
							fz="md"
							c="black"
							fw={600}
						>
							View categories
						</Title>
					</Stack>
				</Link>
				<Link
					href="/admin/products/create"
					bd="1px solid gray.4"
					bdrs="lg"
					p={{
						base: 'md',
						md: 'lg',
					}}
				>
					<Stack gap="xs">
						<ThemeIcon
							size="xl"
							variant="light"
							bg="primary.0"
						>
							<AiFillProduct size={20} />
						</ThemeIcon>
						<Title
							order={3}
							fz="md"
							c="black"
							fw={600}
						>
							Create products
						</Title>
					</Stack>
				</Link>
				<Link
					href="/admin/categories/create"
					bd="1px solid gray.4"
					bdrs="lg"
					p={{
						base: 'md',
						md: 'lg',
					}}
				>
					<Stack gap="xs">
						<ThemeIcon
							size="xl"
							variant="light"
							bg="primary.0"
						>
							<BiSolidCategory size={20} />
						</ThemeIcon>
						<Title
							order={3}
							fz="md"
							c="black"
							fw={600}
						>
							Create categories
						</Title>
					</Stack>
				</Link>
			</SimpleGrid>
		</>
	)
}
