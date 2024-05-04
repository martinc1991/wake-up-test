import { FindManyProductsResponse, FindOneProductResponse } from 'contract'
import { ApiResponse } from './helpers'
import { API } from './instance'

const endpoint = '/products'

export const productsApi = {
  findAll(): ApiResponse<FindManyProductsResponse> {
    return API.get(endpoint)
  },

  findOne(id: string): ApiResponse<FindOneProductResponse> {
    return API.get(`${endpoint}/${id}`)
  },
}
