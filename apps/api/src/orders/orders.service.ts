import { Injectable } from '@nestjs/common'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.$transaction(async (prismaTransaction) => {
      const order = await prismaTransaction.order.create({
        data: {
          restaurant: { connect: { slug: createOrderDto.slug } },
        },
      })

      const items = createOrderDto.items.map((item) => {
        return prismaTransaction.item.create({
          data: {
            order: { connect: { id: order.id } },
            quantity: item.quantity,
            product: { connect: { id: item.productId } },
          },
        })
      })
      await Promise.all(items)

      return order
    })
  }

  findAll(slug?: string) {
    return this.prisma.order.findMany({
      where: {
        restaurant: { slug },
      },
    })
  }

  findOne(id: string) {
    return this.prisma.order.findUnique({ where: { id } })
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    // TODO:
    let newProductsIds: { id: string }[] | undefined

    if (updateOrderDto.items) {
      newProductsIds = updateOrderDto.items.map((item) => ({ id: item.id as string }))
    }

    return this.prisma.order.update({
      where: { id },
      data: {
        items: {
          set: newProductsIds,
        },
      },
    })
  }

  remove(id: string) {
    return this.prisma.order.delete({ where: { id } })
  }
}
