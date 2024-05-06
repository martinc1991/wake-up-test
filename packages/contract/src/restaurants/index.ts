import { Product, Restaurant } from '@prisma/client'

export type FindManyRestaurantsResponse = Restaurant[]

export type RestaurantWithProducts = Restaurant & { products: Product[] }
export type FindOneRestaurantResponse = RestaurantWithProducts | null
