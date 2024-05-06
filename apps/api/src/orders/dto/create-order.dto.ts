import { Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min, ValidateNested } from 'class-validator'
import { CreateOrderPayload } from 'contract'

class OrderItem implements Prisma.ItemCreateManyOrderInput {
  @IsNumber()
  @Min(1)
  @IsOptional()
  quantity?: number

  @IsString()
  @IsNotEmpty()
  productId: string
}

export class CreateOrderDto implements CreateOrderPayload {
  @IsString()
  @IsNotEmpty()
  slug: string

  @IsInt()
  @Min(1)
  table: number

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: Prisma.ItemCreateManyOrderInput[]
}
