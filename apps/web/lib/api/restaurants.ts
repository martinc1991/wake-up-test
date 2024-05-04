import { FindManyRestaurantsResponse, FindOneRestaurantResponse } from 'contract'
import { ApiResponse } from './helpers'
import { API } from './instance'

const endpoint = '/restaurants'

export const restaurantsApi = {
  findAll(): ApiResponse<FindManyRestaurantsResponse> {
    return API.get(endpoint)
  },

  findOne(id: string): ApiResponse<FindOneRestaurantResponse> {
    return API.get(`${endpoint}/${id}`)
  },
}
