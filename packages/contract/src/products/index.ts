import { Product } from '@prisma/client'

export type FindManyProductsResponse = Product[]
export type FindOneProductResponse = Product | null
