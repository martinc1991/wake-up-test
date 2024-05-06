import { Product as SingleProduct } from '@prisma/client'

export type Product = SingleProduct

export type FindManyProductsResponse = SingleProduct[]
export type FindOneProductResponse = SingleProduct | null
