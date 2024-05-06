import { Controller, Get, Param } from '@nestjs/common'
import { FindManyRestaurantsResponse, FindOneRestaurantResponse } from 'contract'
import { RestaurantsService } from './restaurants.service'

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(): Promise<FindManyRestaurantsResponse> {
    return this.restaurantsService.findAll()
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string): Promise<FindOneRestaurantResponse> {
    return await this.restaurantsService.findOneBySlug(slug)
  }
}
