import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaService } from 'src/prisma/prisma.service'
import { RestaurantsService } from './restaurants.service'

describe('RestaurantsService', () => {
  let service: RestaurantsService
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {
    prismaMock = mockDeep<PrismaClient>()

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile()

    service = module.get<RestaurantsService>(RestaurantsService)
  })

  it('controller should be defined', async () => {
    expect(service).toBeDefined()
  })
})
