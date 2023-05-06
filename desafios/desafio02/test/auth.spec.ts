import request from 'supertest'
import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '../src/app'

describe.skip('User route', () => {
  beforeAll(async () => {
    await app.ready()
  })

  beforeEach(async () => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })
  
  afterAll(async () => {
    await app.close()
  })
  
  it('Should be able to create a new user', async () => {
    const response = await request(app.server)
      .post('/users')
      .send({
        name: 'teste',
        password: 'teste123'
      })
    
    expect(response.statusCode).toEqual(201)
  })

  it('Should be able to authenticate an user', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'teste',
        password: 'teste123'
      })

    const result = await request(app.server)
      .post('/users/login')
      .send({
        name: 'teste',
        password: 'teste123'
      })
    
    expect(result.statusCode).toEqual(200)
  })

  it('Should not be able to authenticate with a wrong name', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'teste',
        password: 'teste123'
      })

    const response = await request(app.server)
      .post('/users/login')
      .send({
        name: 'test',
        password: 'teste123'
      })

      expect(response.statusCode).toEqual(500)
  })

  it('Should not be able to authenticate with a wrong password', async () => {
    await request(app.server)
      .post('/users')
      .send({
        name: 'teste',
        password: 'teste123'
      })

    const response = await request(app.server)
      .post('/users/login')
      .send({
        name: 'teste',
        password: 'teste12'
      })

    expect(response.statusCode).toEqual(500)
  })
})

