type UserRole = 'ADMIN' | 'STAFF' | 'CUSTOMER'

type User = {
	name: string
	email: string
	id: string
	role: UserRole
	isActive: boolean
	createdAt: Date
	updatedAt: Date
}

type UserMe = Pick<User, 'name' | 'email' | 'role'>

type Asset = {
	path: 'products'
	userId: string
	filename: string
	createdAt: Date
}

type Product = {
	name: string
	userId: string
	description: string
	id: string
	createdAt: Date
	updatedAt: Date
	slug: string
	price: number
	rating: number
	inStock: boolean
}

type DetailProduct = Product & {
	productThumbnails?: {
		productId: string
		assetId: string
	}[]
	productCategories?: {
		productId: string
		categoryId: string
	}[]
}

type Category = {
	name: string
	id: string
}
