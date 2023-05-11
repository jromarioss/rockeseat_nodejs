import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createPets } from '@/utils/test/create-pets'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch some pets from city', async () => {
    await createPets(app)
    const response = await request(app.server).post('/pet/Cerquilho').send({})

    expect(response.body.pets).toHaveLength(2)
  })
})
