import { API } from './instance'

const endpoint = '/restaurants'

export const restaurantsApi = {
  findAll() {
    return API.get(endpoint)
  },

  findOne(id: string) {
    return API.get(`${endpoint}/${id}`)
  },
}
