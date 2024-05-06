import { CreateOrderPayload, CreateOrderResponse, FindManyOrdersResponse, FulfillOrderResponse, OrderStatus } from 'contract'
import { ApiResponse } from './helpers'
import { API } from './instance'

const endpoint = '/orders'

export const ordersApi = {
  findAllByRestaurant(slug: string, status?: OrderStatus): ApiResponse<FindManyOrdersResponse> {
    return API.get(endpoint, { params: { slug, status } })
  },

  create(createOrderPayload: CreateOrderPayload): ApiResponse<CreateOrderResponse> {
    return API.post(`${endpoint}`, createOrderPayload)
  },

  fulfill(orderId: string): ApiResponse<FulfillOrderResponse> {
    return API.patch(`${endpoint}/${orderId}`, {
      status: OrderStatus.FULLFILLED,
    })
  },
}
