import { FindManyRestaurantsResponse, FindOneRestaurantResponse } from 'contract'
import { ApiResponse } from './helpers'
import { API } from './instance'
import { cache } from 'react'

const endpoint = '/restaurants'

const findAll = (): ApiResponse<FindManyRestaurantsResponse> => {
  return API.get(endpoint)
}

const findOne = cache((id: string): ApiResponse<FindOneRestaurantResponse> => {
  return API.get(`${endpoint}/${id}`)
})

export const restaurantsApi = { findAll, findOne }
