import { IsNotEmpty, IsString } from 'class-validator'

export class CreateRestaurantDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  slug: string
}
