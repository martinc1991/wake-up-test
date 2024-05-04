import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const goodFoods = { name: 'Good Foods', slug: 'good-foods' }
const freddys = { name: 'Freddys', slug: 'freddys' }
const soupHouse = { name: 'Soup House', slug: 'soup-house' }

export const SEED_RESTAURANTS = [goodFoods, freddys, soupHouse]

export async function seedRestaurants() {
  await prisma.restaurant.upsert({
    where: { slug: 'good-foods' },
    update: {
      name: 'Good Foods',
      slug: 'good-foods',
    },
    create: {
      name: 'Good Foods',
      slug: 'good-foods',
    },
  })
  await prisma.restaurant.upsert({
    where: { slug: 'freddys' },
    update: {
      name: 'Freddys',
      slug: 'freddys',
    },
    create: {
      name: 'Freddys',
      slug: 'freddys',
    },
  })
  await prisma.restaurant.upsert({
    where: { slug: 'soup-house' },
    update: {
      name: 'Soup House',
      slug: 'soup-house',
    },
    create: {
      name: 'Soup House',
      slug: 'soup-house',
    },
  })
}
