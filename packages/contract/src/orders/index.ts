import { Item, Order, Prisma, Product } from '@prisma/client'
export { OrderStatus } from '@prisma/client'

export type FindManyOrdersResponse = (Order & { items: (Item & { product: Product })[] })[]
export type FindOneOrderResponse = Order | null

export type CreateOrderPayload = {
  slug: string
  items: Prisma.ItemCreateManyOrderInput[]
  table: number
}
export type CreateOrderResponse = Order

export type FulfillOrderPayload = { slug: string; orderId: string }
export type FulfillOrderResponse = Order
