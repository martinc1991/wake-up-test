import { Module } from '@nestjs/common'
import { ProductsModule } from './products/products.module'
import { RestaurantsModule } from './restaurants/restaurants.module'
import { OrdersModule } from './orders/orders.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [ProductsModule, RestaurantsModule, OrdersModule, ItemsModule],
})
export class AppModule {}
