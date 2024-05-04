import { Restaurant, Prisma, Product } from '@prisma/client'

export type FindManyRestaurantsResponse = Restaurant[]
export type FindOneRestaurantResponse = (Restaurant & { products: Product[] }) | null
