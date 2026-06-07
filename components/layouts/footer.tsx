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
						© {new Date().getFullYear()}. Technical Assessment for Creativeans
					</Text>
					<Group
						gap="xs"
						justify="center"
						w={{
							base: '100%',
							lg: 'auto',
						}}
					>
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
							Grafis Nuresa
						</Link>
						<Link
							href="https://github.com/iamgdevvv/tha-creativeans-frontend"
							underline="hover"
							openNewTab
							c="white"
							fz="sm"
							ta={{
								base: 'center',
								lg: 'right',
							}}
						>
							Github
						</Link>
						<Link
							href="https://www.linkedin.com/in/grafis-nuresa/"
							underline="hover"
							openNewTab
							c="white"
							fz="sm"
							ta={{
								base: 'center',
								lg: 'right',
							}}
						>
							Linkedin
						</Link>
					</Group>
				</Group>
			</Container>
		</Box>
	)
}
