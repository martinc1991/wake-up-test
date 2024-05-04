import { Restaurant } from '@prisma/client'

export const restaurantStub: Restaurant = {
  id: 'some-restaurant-id',
  name: 'some-restaurant-name',

  slug: 'some-restaurant-slug',

  createdAt: new Date(),
  updatedAt: new Date(),
}
