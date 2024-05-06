import {
  CreateOrderPayload,
  CreateOrderResponse,
  FindManyOrdersResponse,
  FulfillOrderPayload,
  FulfillOrderResponse,
  OrderStatus,
} from 'contract'
import { ApiResponse } from './helpers'
import { API } from './instance'

const endpoint = '/orders'

export const ordersApi = {
  findAllByRestaurant(slug: string): ApiResponse<FindManyOrdersResponse> {
    return API.get(endpoint, { params: { slug } })
  },

  findOne(id: string) {
    return API.get(`${endpoint}/${id}`)
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
