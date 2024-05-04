import { Prisma } from '@prisma/client'

export class CreateOrderDto {
  restaurantId: string

  items: Prisma.ItemUncheckedCreateNestedManyWithoutOrderInput
}
