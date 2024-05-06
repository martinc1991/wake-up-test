'use server'

import { ordersApi } from '@/lib/api'
import { FulfillOrderPayload } from 'contract'
import { revalidatePath } from 'next/cache'

export async function fulfillOrder(params: FulfillOrderPayload) {
  await ordersApi.fulfill(params.orderId)

  revalidatePath(`/${params.slug}/orders`)
}
