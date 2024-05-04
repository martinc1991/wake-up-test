import { API } from './instance'

const endpoint = '/items'

export const ordersItemsApi = {
  findAll() {
    return API.get(endpoint)
  },

  findOne(id: string) {
    return API.get(`${endpoint}/${id}`)
  },
}
