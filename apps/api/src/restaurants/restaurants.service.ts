import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.restaurant.findMany()
  }

  findOneBySlug(slug: string) {
    return this.prisma.restaurant.findUnique({ where: { slug }, include: { products: true } })
  }
}
