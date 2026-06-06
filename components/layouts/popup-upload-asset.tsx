'use client'
import {
	Alert,
	Button,
	Image,
	Popover,
	PopoverDropdown,
	PopoverTarget,
	Select,
	Stack,
	Text,
	Transition,
	type ButtonProps,
} from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { schemaResolver, useForm } from '@mantine/form'
import { useCallback, useEffect, useMemo, useState, useTransition } from 'react'
import { LuImage, LuUpload, LuX } from 'react-icons/lu'

import { optionsAssetPath } from '@libs/enum'
import { useScrollFormError } from '@libs/hooks'
import { uploadAsset } from '@libs/repo/assets'
import { UploadAssetSchema, type UploadAsset } from '@libs/schema/asset'

type Props = {
	onSubmit?: () => void
} & ButtonProps

export default function PopupUploadAsset({ onSubmit, ...props }: Props) {
	const [opened, setOpened] = useState(false)
	const [errorUploadAsset, setErrorUploadAsset] = useState<string | null>(null)
	const [isLoadingSubmit, startActionSubmit] = useTransition()
	const form = useForm<UploadAsset>({
		validate: schemaResolver(UploadAssetSchema, { sync: true }),
	})

	useEffect(() => {
		if (optionsAssetPath.length) {
			form.setFieldValue('path', optionsAssetPath[0].value)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handlerSubmit = useCallback(
		async (payload: UploadAsset) => {
			setErrorUploadAsset(null)

			startActionSubmit(async () => {
				const result = await uploadAsset(payload)

				if (result.code === 'error') {
					setErrorUploadAsset('Failed to upload data')
					return
				}

				setOpened(false)

				if (onSubmit) {
					onSubmit()
				} else {
					window.location.reload()
				}
			})
		},
		[onSubmit],
	)

	const scrollFormError = useScrollFormError()

	const previewImage = useMemo(() => {
		if (form.values.file) {
			return URL.createObjectURL(form.values.file)
		}

		return null
	}, [form.values.file])

	return (
		<Popover
			width={260}
			position="bottom-end"
			radius="lg"
			withinPortal={false}
			opened={opened}
			onChange={setOpened}
		>
			<PopoverTarget>
				<Button
					{...props}
					variant="light"
					fz="xs"
					fw={600}
					px="xs"
					py="xs"
					ml="auto"
					disabled={isLoadingSubmit}
					onClick={() => setOpened((o) => !o)}
				>
					Upload
				</Button>
			</PopoverTarget>
			<PopoverDropdown>
				<form onSubmit={form.onSubmit(handlerSubmit, () => scrollFormError)}>
					<Transition mounted={!!errorUploadAsset}>
						{(styleTransition) => (
							<Alert
								variant="light"
								color="red"
								mb="md"
								p="xs"
								style={styleTransition}
							>
								<Text fz="sm">{errorUploadAsset}</Text>
							</Alert>
						)}
					</Transition>
					<Stack gap="sm">
						<Select
							key={form.key('path')}
							{...form.getInputProps('path')}
							size="sm"
							data={optionsAssetPath}
							readOnly={isLoadingSubmit}
							comboboxProps={{
								withinPortal: false,
							}}
						/>
						<Dropzone
							onDrop={(files) => {
								if (files.length) {
									form.setFieldValue('file', files[0])
								}
							}}
							onReject={() => {
								form.setFieldError('file', 'Invalid file type')
							}}
							maxSize={6 * 1024 ** 2}
							accept={IMAGE_MIME_TYPE}
							multiple={false}
							loading={isLoadingSubmit}
						>
							<Stack
								align="center"
								ta="center"
								gap={6}
							>
								{previewImage ? (
									<Image
										src={previewImage}
										w={100}
										h={100}
										onLoad={() => URL.revokeObjectURL(previewImage)}
										style={{ objectFit: 'contain' }}
									/>
								) : (
									<>
										<Dropzone.Accept>
											<LuUpload size={28} />
										</Dropzone.Accept>
										<Dropzone.Reject>
											<LuX size={28} />
										</Dropzone.Reject>
										<Dropzone.Idle>
											<LuImage size={28} />
										</Dropzone.Idle>
									</>
								)}

								<Text
									fw={500}
									fz="xs"
									c="gray.6"
									span
								>
									Drag image here or click to select file
								</Text>
							</Stack>
						</Dropzone>
						<Button
							type="submit"
							loading={isLoadingSubmit}
						>
							Upload Asset
						</Button>
					</Stack>
				</form>
			</PopoverDropdown>
		</Popover>
	)
}
