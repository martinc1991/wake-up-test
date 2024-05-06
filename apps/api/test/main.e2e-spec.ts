import { INestApplication, ValidationPipe } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import { Test, TestingModule } from '@nestjs/testing'
import { AllExceptionsFilter } from 'src/all-exceptions.filter'
import { AppModule } from '../src/app.module'

describe('Auth flow', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    // Config from the main.ts file
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
    const { httpAdapter } = app.get(HttpAdapterHost)
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter))

    // Config for the e2e test only
    app.useLogger(false) // Just for the console to be cleaner

    await app.init()
  })

  describe('e2e testing', () => {
    it('App should be defined', async () => {
      expect(app).toBeDefined()
    })
  })
})
