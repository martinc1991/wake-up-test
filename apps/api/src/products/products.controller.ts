import { Controller, Get, Param } from '@nestjs/common'
import { FindManyProductsResponse, FindOneProductResponse } from 'contract'
import { ProductsService } from './products.service'

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(): Promise<FindManyProductsResponse> {
    return this.productsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<FindOneProductResponse | null> {
    return this.productsService.findOne(id)
  }
}
