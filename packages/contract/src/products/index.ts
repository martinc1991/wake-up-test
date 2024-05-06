import { Product as SingleProduct } from '@prisma/client'

export type FindManyProductsResponse = SingleProduct[]
export type FindOneProductResponse = SingleProduct | null

export type Product = SingleProduct
