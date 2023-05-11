import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token', async () => {
    await request(app.server).post('/register').send({
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

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'teste@gmail.com', 
      password: '12345678',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})
