import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateOrganization } from '@/utils/test/create-and-authenticate-organization'

describe('Get Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get a pet by id', async () => {
    const { token } = await createAndAuthenticateOrganization(app)

    const createPetResponse = await request(app.server)
      .post('/create')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Doguinho',
        description: 'Cachorrinho fofo',
        age: 'YOUNG',
        size: 'MEDIUM',
        habitation: 'MEDIUM',
        energy: 'MEDIUM',
        city: 'Cerquilho'
      })

    const { pet } = createPetResponse.body

    const response = await request(app.server)
      .get(`/pet/${pet.id}`)
      .query({
        city: 'Cerquilho',
        age: 'YOUNG',
        size: 'MEDIUM',
        habitation: 'MEDIUM',
        energy: 'MEDIUM'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.pet).toEqual(
      expect.objectContaining({
        name: 'Doguinho'
      })
    )
  })
})
