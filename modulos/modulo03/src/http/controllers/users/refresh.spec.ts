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
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@email.com',
      password: '123456',
    })

    const cookies =  authResponse.get('Set-Cookie')

    const response = await request(app.server) //faz chamada no servidor
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(authResponse.statusCode).toEqual(200)
    expect(authResponse.body).toEqual({
      token: expect.any(String)
    })
    expect(authResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})