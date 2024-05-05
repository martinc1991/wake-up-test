'use server'

import { ordersApi } from '@/lib/api'
import { CreateOrderPayload } from 'contract'

export async function createOrder(params: CreateOrderPayload) {
  await ordersApi.create(params)
}
