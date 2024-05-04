'use server'

import { restaurantsApi } from '@/lib/api'

export async function signIn({ username, password }: { username: string; password: string }) {
  const { data: existingRestaurants } = await restaurantsApi.findAll()

  const restaurantsSlugs = existingRestaurants.map((restaurant) => restaurant.slug.toLowerCase())

  if (restaurantsSlugs.includes(username.toLowerCase())) {
    return true
  } else {
    return false
  }
}
