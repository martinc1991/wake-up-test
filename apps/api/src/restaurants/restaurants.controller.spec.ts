import { Test, TestingModule } from '@nestjs/testing'
import { PrismaClient } from '@prisma/client'
import { DeepMockProxy, mockDeep } from 'jest-mock-extended'
import { PrismaService } from 'src/prisma/prisma.service'
import { RestaurantsController } from './restaurants.controller'
import { RestaurantsService } from './restaurants.service'

describe('RestaurantsController', () => {
  let controller: RestaurantsController
  let prismaMock: DeepMockProxy<PrismaClient>
  let serviceMock: DeepMockProxy<RestaurantsService>

  beforeEach(async () => {
    jest.resetAllMocks()

    prismaMock = mockDeep<PrismaClient>()
    serviceMock = mockDeep<RestaurantsService>()

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestaurantsController],
      providers: [
        { provide: RestaurantsService, useValue: serviceMock },
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile()

    controller = module.get<RestaurantsController>(RestaurantsController)
  })

  it('controller should be defined', async () => {
    expect(controller).toBeDefined()
  })
})
