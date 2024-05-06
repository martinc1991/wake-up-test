import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { Order, OrderStatus } from '@prisma/client'
import { FindManyOrdersResponse } from 'contract'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  findAll(@Query('slug') slug?: string, @Query('status') status?: OrderStatus): Promise<FindManyOrdersResponse> {
    return this.ordersService.findAll(slug, status)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.ordersService.update(id, updateOrderDto)
  }
}
