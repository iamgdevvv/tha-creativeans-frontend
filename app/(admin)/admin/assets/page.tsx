import {
	ActionIcon,
	Group,
	HoverCard,
	HoverCardDropdown,
	HoverCardTarget,
	Input,
	PaginationNext,
	PaginationPrevious,
	PaginationRoot,
	Table,
	TableCaption,
	TableTbody,
	TableTd,
	TableTh,
	TableThead,
	TableTr,
	Text,
	Title,
} from '@mantine/core'
import type { Metadata } from 'next'
import { LuSearch } from 'react-icons/lu'

import ButtonDeleteAsset from '@components/atoms/button-delete-asset'
import Image from '@components/atoms/image'
import Link from '@components/atoms/link'
import PopupUploadAsset from '@components/layouts/popup-upload-asset'
import { queryAssets } from '@libs/repo/assets'
import { assetUrl } from '@libs/utils'

export const metadata: Metadata = {
	title: 'Assets',
}

export const dynamic = 'force-dynamic'

type AppProps = {
	searchParams: Promise<{ q?: string; page?: string }>
}

export default async function Assets({ searchParams }: AppProps) {
	const { q, page: pageParam } = await searchParams

	const limit = 12
	const page = Number(pageParam) || 1
	const skip = (Number(page) - 1) * limit

	const resultAssets = await queryAssets<Pick<Asset, 'filename' | 'path'>>({
		select: ['filename', 'path'],
		desc: ['createdAt'],
		q,
		limit,
		skip,
	})

	return (
		<>
			<Group>
				<Title fz="xl">Assets</Title>
				<PopupUploadAsset />
			</Group>
			<Group
				component="form"
				mt="xl"
				gap="xs"
				justify="flex-end"
			>
				<Input
					key={`search-${q}-${page}`}
					type="search"
					maw={480}
					visibleFrom="sm"
					placeholder="Search"
					name="q"
					defaultValue={q}
					rightSectionPointerEvents="auto"
					rightSectionWidth={40}
					rightSection={
						<ActionIcon
							type="submit"
							variant="subtle"
						>
							<LuSearch className="pointer-events-none" />
						</ActionIcon>
					}
				/>
			</Group>
			<Table
				mt="sm"
				striped
				withRowBorders={false}
			>
				<TableThead>
					<TableTr>
						<TableTh></TableTh>
						<TableTh>Filename</TableTh>
						<TableTh>Path</TableTh>
						<TableTh ta="right">Action</TableTh>
					</TableTr>
				</TableThead>
				{resultAssets.code === 'success' && resultAssets.data.length ? (
					<>
						<TableTbody>
							{resultAssets.data.map((asset) => (
								<TableTr key={asset.filename}>
									<TableTd w={60}>
										<HoverCard width={240}>
											<HoverCardTarget>
												<Image
													src={assetUrl(asset)}
													width={200}
													height={200}
													w={40}
													h={40}
													alt={asset.filename}
													objectFit="contain"
												/>
											</HoverCardTarget>
											<HoverCardDropdown>
												<Image
													src={assetUrl(asset)}
													width={200}
													height={200}
													alt={asset.filename}
													objectFit="contain"
													w="100%"
												/>
											</HoverCardDropdown>
										</HoverCard>
									</TableTd>
									<TableTd fz="sm">{asset.filename}</TableTd>
									<TableTd fz="sm">{asset.path}</TableTd>
									<TableTd>
										<Group
											gap={6}
											justify="flex-end"
										>
											<ButtonDeleteAsset
												params={asset}
												variant="light"
												color="red"
												fz="xs"
												fw={600}
												px="xs"
												py={6}
											>
												Delete
											</ButtonDeleteAsset>
										</Group>
									</TableTd>
								</TableTr>
							))}
						</TableTbody>
						<TableCaption>
							<Group justify="flex-end">
								<Text
									span
									size="sm"
								>{`Showing ${resultAssets.skip + 1} - ${Math.min(resultAssets.total, resultAssets.limit * page)} of ${resultAssets.total}`}</Text>
								<PaginationRoot
									total={resultAssets.total}
									value={page}
								>
									<Group gap="xs">
										<PaginationPrevious
											component={Link}
											href={`/admin/assets?page=${page - 1}${q ? `&q=${q}` : ''}`}
										/>
										{resultAssets.total > limit * page ? (
											<PaginationNext
												component={Link}
												href={`/admin/assets?page=${page + 1}${q ? `&q=${q}` : ''}`}
											/>
										) : (
											<PaginationNext disabled />
										)}
									</Group>
								</PaginationRoot>
							</Group>
						</TableCaption>
					</>
				) : (
					<TableCaption>Assets not found</TableCaption>
				)}
			</Table>
		</>
	)
}
