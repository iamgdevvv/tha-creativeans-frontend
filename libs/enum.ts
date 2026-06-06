import type { ComboboxItem } from '@mantine/core'

import { AssetPathSchema } from '@libs/schema/asset'
import { UserRoleSchema } from '@libs/schema/user'
import { titleCase } from '@libs/utils'

export const optionsAssetPath = AssetPathSchema.options.map(
	(item) =>
		({
			label: titleCase(item),
			value: item,
		}) satisfies ComboboxItem,
)

export const optionsUserRole = UserRoleSchema.options.map(
	(item) =>
		({
			label: titleCase(item),
			value: item,
		}) satisfies ComboboxItem,
)
