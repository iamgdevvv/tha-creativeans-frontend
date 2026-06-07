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

type UserMe = Pick<User, 'name' | 'email' | 'role'> & {
	hasAuth: boolean
}

type Asset = {
	path: 'products'
	userId: string
	filename: string
	createdAt: Date
}

type Product = {
	id: string
	name: string
	userId: string
	description: string
	createdAt: Date
	updatedAt: Date
	slug: string
	price: number
	rating: number
	inStock: boolean
}

type Product = {
	id: string
	name: string
	userId: string
	description: string
	createdAt: Date
	updatedAt: Date
	slug: string
	price: number
	rating: number
	inStock: boolean
}

type ProductPublic = Omit<Product, 'id' | 'userId'> & {
	thumbnails: string[]
	categories: Category[]
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
