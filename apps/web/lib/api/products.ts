import { API } from './instance'

const endpoint = '/products'

export const productsApi = {
  findAll() {
    return API.get(endpoint)
  },

  findOne(id: string) {
    return API.get(`${endpoint}/${id}`)
  },
}
