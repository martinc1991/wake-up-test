import { API } from './instance'

const endpoint = '/orders'

export const ordersApi = {
  findAll() {
    return API.get(endpoint)
  },

  findOne(id: string) {
    return API.get(`${endpoint}/${id}`)
  },
}
