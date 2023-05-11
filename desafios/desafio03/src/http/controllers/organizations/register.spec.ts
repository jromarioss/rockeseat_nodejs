import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Register Organization (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a organization', async () => {
    const response = await request(app.server).post('/register').send({
      name: 'Organization Test', 
      owner_name: 'Name Test', 
      email: 'teste@gmail.com', 
      password: '12345678',
      phone: '15123456789', 
      zip_code: 87654321, 
      state: 'TT', 
      city: 'Cerquilho',
      address: 'Rua Testando Test', 
      address_number: 102,
    })

    expect(response.statusCode).toEqual(201)
  })
})
