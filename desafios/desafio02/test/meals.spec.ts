import request from 'supertest'
import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { app } from '../src/app'

describe('Meal route', () => {
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

  it('Should be able to create a meal', async () => {
    const response = await request(app.server)
      .post('/meals')
      .send({
        name: 'teste',
        description: 'teste teste',
        diet: 'yes',
        time: '10:00',
        user_id: 'teste'
      })

    expect(response.statusCode).toEqual(201)
  })

  it('Should be able to get all meals', async () => {
    await request(app.server).post('/meals').send({
      name: 'teste',
      description: 'teste teste',
      diet: 'yes',
      time: '10:00',
    })

    const listAllMealsResponse = await request(app.server)
      .get('/meals')
      .expect(200)

    expect(listAllMealsResponse.body.meals).toEqual([
      expect.objectContaining({
        name: 'teste',
        description: 'teste teste',
        diet: 'yes',
        time: '10:00',
      })
    ])
  })
})