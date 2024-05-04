import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common'
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

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FindOneRestaurantResponse> {
    const restaurant = await this.restaurantsService.findOne(id)

    // TODO: this is not good, if there is no restaurant it should return null
    // Is not an error that something the user request doesnt exist
    if (!restaurant) throw new NotFoundException('Restaurant not found')

    return restaurant
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
