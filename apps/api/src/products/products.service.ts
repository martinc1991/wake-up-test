import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.product.findMany()
  }

  findOne(id: string) {
    return this.prisma.product.findUniqueOrThrow({ where: { id } })
  }
}
