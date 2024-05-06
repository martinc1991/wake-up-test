import { Module } from '@nestjs/common'
import { OrdersModule } from './orders/orders.module'
import { ProductsModule } from './products/products.module'
import { RestaurantsModule } from './restaurants/restaurants.module'

@Module({
  imports: [ProductsModule, RestaurantsModule, OrdersModule],
})
export class AppModule {}
