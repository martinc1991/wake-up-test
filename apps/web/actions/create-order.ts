'use server'

import { ordersApi } from '@/lib/api'
import { CreateOrderPayload } from 'contract'
import { revalidatePath } from 'next/cache'

export async function createOrder(params: CreateOrderPayload) {
  await ordersApi.create(params)

  revalidatePath(`/${params.slug}/orders`)
}
