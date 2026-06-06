'use client'
import { Flex, HoverCard, MultiSelect, Pill, Text, type MultiSelectProps } from '@mantine/core'
import { useMemo } from 'react'

import Image from '@components/atoms/image'
import { assetUrl, cn } from '@libs/utils'

export default function AssetDropdown({
	data,
	...props
}: Omit<MultiSelectProps, 'data'> & {
	data: Pick<Asset, 'path' | 'filename'>[]
}) {
	const options = useMemo(() => data.map((item) => item.filename), [data])

	return (
		<MultiSelect
			label="Select assets"
			clearable
			searchable
			limit={20}
			hidePickedOptions
			{...props}
			classNames={{
				...props.classNames,
				pillsList: cn(
					props?.classNames &&
						'pillsList' in props.classNames &&
						props.classNames.pillsList,
					'block space-y-1 pr-4!',
				),
			}}
			data={options}
			renderPill={({ option, reorderProps, onRemove }) => {
				const asset = data.find((asset) => asset.filename === option.value)

				if (!option?.label) {
					return null
				}

				if (!asset) {
					return (
						<Pill
							{...reorderProps}
							withRemoveButton
							onRemove={onRemove}
						>
							{option.label}
						</Pill>
					)
				}

				return (
					<Pill
						w="100%"
						h="auto"
						bdrs="md"
						py="xs"
						{...reorderProps}
						withRemoveButton
						onRemove={onRemove}
					>
						<Flex gap="xs">
							<HoverCard width={240}>
								<HoverCard.Target>
									<Image
										src={assetUrl(asset)}
										w={36}
										miw={36}
										h={36}
										width={36}
										height={36}
										radius="sm"
										bd="1px solid gray.4"
									/>
								</HoverCard.Target>
								<HoverCard.Dropdown>
									<Image
										src={assetUrl(asset)}
										width={200}
										height={200}
										alt={asset.filename}
										objectFit="contain"
										w="100%"
									/>
								</HoverCard.Dropdown>
							</HoverCard>
							<Text
								span
								fz="xs"
							>
								{option.label}
							</Text>
						</Flex>
					</Pill>
				)
			}}
			renderOption={({ option }) => {
				const asset = data.find((asset) => asset.filename === option.value)

				if (!asset) {
					return (
						<Text
							span
							fz="sm"
						>
							{option.label}
						</Text>
					)
				}

				return (
					<Flex gap="xs">
						<HoverCard width={240}>
							<HoverCard.Target>
								<Image
									src={assetUrl(asset)}
									w={36}
									miw={36}
									h={36}
									width={36}
									height={36}
									radius="sm"
									bd="1px solid gray.4"
								/>
							</HoverCard.Target>
							<HoverCard.Dropdown>
								<Image
									src={assetUrl(asset)}
									width={200}
									height={200}
									alt={asset.filename}
									objectFit="contain"
									w="100%"
								/>
							</HoverCard.Dropdown>
						</HoverCard>
						<Text
							span
							fz="sm"
						>
							{option.label}
						</Text>
					</Flex>
				)
			}}
		/>
	)
}
