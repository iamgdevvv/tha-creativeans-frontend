'use client'
import {
	Button,
	Popover,
	PopoverDropdown,
	PopoverTarget,
	Stack,
	Text,
	type ButtonProps,
} from '@mantine/core'
import { useState, useTransition } from 'react'

import { deleteUser } from '@libs/repo/users'

export default function ButtonDeleteUser({
	userId,
	onDelete,
	...props
}: {
	userId: User['id']
	onDelete?: () => void
} & Omit<ButtonProps, 'onClick'>) {
	const [opened, setOpened] = useState(false)

	const [isLoadingDelete, startActionDelete] = useTransition()

	return (
		<Popover
			width={200}
			position="bottom-end"
			opened={opened}
			onChange={setOpened}
		>
			<PopoverTarget>
				<Button
					{...props}
					loading={isLoadingDelete || props.loading}
					onClick={() => setOpened((o) => !o)}
				/>
			</PopoverTarget>
			<PopoverDropdown>
				<Stack gap="xs">
					<Text size="xs">Are you sure you want to delete this user?</Text>
					<Stack gap={4}>
						<Button
							variant="light"
							size="xs"
							fz="xs"
							disabled={isLoadingDelete || props.loading}
							onClick={() => setOpened(false)}
						>
							Cancel
						</Button>
						<Button
							color="red"
							size="xs"
							fz="xs"
							disabled={isLoadingDelete || props.loading}
							onClick={() => {
								startActionDelete(async () => {
									await deleteUser(userId)

									if (onDelete) {
										onDelete()
									}

									setOpened(false)
								})
							}}
						>
							Delete anyway
						</Button>
					</Stack>
				</Stack>
			</PopoverDropdown>
		</Popover>
	)
}
