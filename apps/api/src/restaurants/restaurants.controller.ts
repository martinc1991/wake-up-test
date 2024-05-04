import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { FindManyRestaurantsResponse, FindOneRestaurantResponse } from 'contract'
import { CreateRestaurantDto } from './dto/create-restaurant.dto'
import { UpdateRestaurantDto } from './dto/update-restaurant.dto'
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

  @Post()
  async create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRestaurantDto: UpdateRestaurantDto) {
    return this.restaurantsService.update(id, updateRestaurantDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.restaurantsService.remove(id)
  }
}
