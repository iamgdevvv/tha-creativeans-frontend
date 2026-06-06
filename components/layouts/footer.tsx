import { Box, Container, Group, Text, type BoxProps, type ContainerProps } from '@mantine/core'

import Link from '@components/atoms/link'

export type HeaderProps = {
	containerSize?: ContainerProps['size']
} & BoxProps

export default function Footer({ containerSize, ...props }: HeaderProps) {
	return (
		<Box
			bg="black"
			{...props}
			component="footer"
			data-slot="Footer"
		>
			<Container
				py={{
					base: 'lg',
					md: 'xl',
				}}
				size={containerSize}
			>
				<Group
					gap="xs"
					justify="space-between"
				>
					<Text
						display="block"
						component="span"
						c="white"
						fz="sm"
						ta={{
							base: 'center',
							lg: 'left',
						}}
						w={{
							base: '100%',
							lg: 'auto',
						}}
					>
						© {new Date().getFullYear()}. Grafis Nuresa
					</Text>
					<Group
						gap="xs"
						w={{
							base: '100%',
							lg: 'auto',
						}}
					>
						<Link
							href="/admin"
							underline="hover"
							openNewTab
							c="white"
							fz="sm"
							ta={{
								base: 'center',
								lg: 'right',
							}}
						>
							Admin Dashboard
						</Link>
						<Link
							href="https://iamgdev.my.id"
							underline="hover"
							openNewTab
							c="white"
							fz="sm"
							ta={{
								base: 'center',
								lg: 'right',
							}}
						>
							Portofolio & Social
						</Link>
					</Group>
				</Group>
			</Container>
		</Box>
	)
}
