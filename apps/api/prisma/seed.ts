import { PrismaClient } from '@prisma/client'
import { seedProducts } from './seed/products'
import { seedRestaurants } from './seed/restaurants'

const prisma = new PrismaClient()

const CYAN = '\x1b[36m'
const RESET = '\x1b[0m'

async function main() {
  performance.mark('start')
  console.log(`${CYAN}🌱 Starting seeding ${RESET}`)

  // Restaurants
  console.log('Seeding restaurants')
  await seedRestaurants()

  // Products
  console.log('Seeding products')
  await seedProducts()

  performance.mark('end')
}
main()
  .then(async () => {
    console.log(`${CYAN}🌱 Seeded in: ${(performance.measure('final', 'start', 'end').duration / 1000).toFixed(2)} s  ${RESET}`)
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.product.deleteMany()
    await prisma.restaurant.deleteMany()
    await prisma.$disconnect()
    process.exit(1)
  })
