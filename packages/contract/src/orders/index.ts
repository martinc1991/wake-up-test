import { Order, Prisma } from '@prisma/client'

export type FindManyOrdersResponse = Order[]
export type FindOneOrderResponse = Order | null

export type CreateOrderPayload = {
  slug: string
  items: Prisma.ItemCreateManyOrderInput[]
}
export type CreateOrderResponse = Order