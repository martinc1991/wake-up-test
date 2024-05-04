import { Restaurant } from '@prisma/client'

export const restaurantStub: Restaurant = {
  id: 'some-restaurant-id',
  name: 'some-restaurant-name',

  createdAt: new Date(),
  updatedAt: new Date(),
}
