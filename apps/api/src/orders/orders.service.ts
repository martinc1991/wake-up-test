import { Injectable } from '@nestjs/common'
import { Order, OrderStatus } from '@prisma/client'
import { FindManyOrdersResponse } from 'contract'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}
  async create(createOrderDto: CreateOrderDto) {
    return await this.prisma.$transaction(async (prismaTransaction) => {
      const order = await prismaTransaction.order.create({
        data: {
          restaurant: { connect: { slug: createOrderDto.slug } },
          table: createOrderDto.table,
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

  findAll(slug?: string, status?: OrderStatus): Promise<FindManyOrdersResponse> {
    return this.prisma.order.findMany({
      where: {
        restaurant: { slug },
        status: status,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    })
  }

  update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    let newProductsIds: { id: string }[] | undefined

    if (updateOrderDto.items) {
      newProductsIds = updateOrderDto.items.map((item) => ({ id: item.id as string }))
    }

    return this.prisma.order.update({
      where: { id },
      data: { ...updateOrderDto, items: { set: newProductsIds } },
    })
  }
}
