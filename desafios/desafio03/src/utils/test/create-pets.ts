import request from 'supertest'
import { FastifyInstance } from 'fastify'

import { createAndAuthenticateOrganization } from './create-and-authenticate-organization'

export async function createPets(app: FastifyInstance) {
  const { token } = await createAndAuthenticateOrganization(app)

  await request(app.server)
    .post('/create')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Doguinho',
      description: 'Cachorrinho fofo',
      age: 'YOUNG',
      size: 'MEDIUM',
      habitation: 'MEDIUM',
      energy: 'MEDIUM',
      city: 'Cerquilho',
    })

  await request(app.server)
    .post('/create')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Doguinho 02',
      description: 'Cachorrinho fofo 02',
      age: 'ADULT',
      size: 'BIG',
      habitation: 'BIG',
      energy: 'VERY',
      city: 'Cerquilho',
    })

  await request(app.server)
    .post('/create')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'Doguinho 03',
      description: 'Cachorrinho fofo 03',
      age: 'CUB',
      size: 'SMALL',
      habitation: 'MEDIUM',
      energy: 'VERY_MUCH',
      city: 'Cerquilho',
    })

  await request(app.server)
  .post('/create')
  .set('Authorization', `Bearer ${token}`)
  .send({
    name: 'Doguinho 04',
    description: 'Cachorrinho fofo 04',
    age: 'ADULT',
    size: 'BIG',
    habitation: 'MEDIUM',
    energy: 'MEDIUM',
    city: 'Cerquilho',
  })
}