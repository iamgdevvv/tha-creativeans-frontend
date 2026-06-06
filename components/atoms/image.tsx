import { Image as MantineImage, type ImageProps as MantineImageProps } from '@mantine/core'
import NextImage, { type ImageProps as NextImageProps } from 'next/image'

export type ImageProps = Omit<NextImageProps, 'src' | 'alt'> &
	Omit<MantineImageProps, 'src'> & {
		src: NextImageProps['src'] | null | undefined
		alt?: string
		objectFit?: 'contain' | 'cover'
		objectPosition?: string
	}

export default function Image({
	src,
	quality = 90,
	objectFit,
	objectPosition,
	...props
}: ImageProps) {
	if (!src) {
		return (
			<MantineImage
				alt=""
				loading="lazy"
				fetchPriority="low"
				{...props}
				style={{
					...props.style,
					objectFit,
					objectPosition,
				}}
			/>
		)
	}

	return (
		<MantineImage
			alt=""
			loading="lazy"
			fetchPriority="low"
			{...props}
			component={NextImage}
			src={src}
			quality={quality}
			style={{
				...props.style,
				objectFit,
				objectPosition,
			}}
		/>
	)
}
