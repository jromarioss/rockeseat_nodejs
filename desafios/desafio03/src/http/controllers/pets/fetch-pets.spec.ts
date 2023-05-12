import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createPets } from '@/utils/test/create-pets'

describe('Fetch Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
    await createPets(app)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch some pets from city', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Cerquilho',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(4)
  })

  it('should be able to fetch some pets by age', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Cerquilho',
      age: 'CUB'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(1)
  })

  it('should be able to fetch some pets by energy', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Cerquilho',
      energy: 'MEDIUM'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })

  it('should be able to fetch some pets by habitation', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Cerquilho',
      habitation: 'MEDIUM'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(3)
  })

  it('should be able to fetch some pets by size', async () => {
    const response = await request(app.server).get('/pets').query({
      city: 'Cerquilho',
      size: 'BIG'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body.pets).toHaveLength(2)
  })
})
