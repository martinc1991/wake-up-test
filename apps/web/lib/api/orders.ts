import { FindManyOrdersResponse } from 'contract'
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
}
