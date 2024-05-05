import { CreateOrderPayload, CreateOrderResponse, FindManyOrdersResponse } from 'contract'
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
}
