import { PrismaClient } from '@prisma/client'
import { SEED_RESTAURANTS } from './restaurants'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export async function seedProducts() {
  for (const restaurant of SEED_RESTAURANTS) {
    // Products
    for (let i = 0; i < 20; i++) {
      await prisma.product.upsert({
        where: { id: `fake-food-${restaurant.slug}-${i}` },
        create: {
          id: `fake-food-${restaurant.slug}-${i}`,
          name: faker.food.dish(),
          description: faker.food.description(),
          price: faker.number.int({ min: 1, max: 100 }),
          restaurant: {
            connect: { slug: restaurant.slug },
          },
        },
        update: {
          name: faker.food.dish(),
          price: faker.number.int({ min: 1, max: 100 }),
          description: faker.food.description(),
          restaurant: {
            connect: { slug: restaurant.slug },
          },
        },
      })
    }
  }
}
