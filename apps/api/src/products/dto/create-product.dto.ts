import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  restaurantId: string

  @IsNumber()
  price: number
}
