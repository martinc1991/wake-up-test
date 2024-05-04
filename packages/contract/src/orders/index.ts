import { Order } from '@prisma/client'

export type FindManyOrdersResponse = Order[]
export type FindOneOrderResponse = Order | null
