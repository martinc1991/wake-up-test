import { Order, Prisma } from '@prisma/client'
export { OrderStatus } from '@prisma/client'

export type FindManyOrdersResponse = Order[]
export type FindOneOrderResponse = Order | null

export type CreateOrderPayload = {
  slug: string
  items: Prisma.ItemCreateManyOrderInput[]
  table: number
}
export type CreateOrderResponse = Order
