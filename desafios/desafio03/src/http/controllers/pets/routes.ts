import { FastifyInstance } from 'fastify'

import { create } from './create'
import { getPet } from './get-pet'
import { fetchPets } from './fetch-pets'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.get('/pet/:id', getPet)
  app.get('/pets', fetchPets)

  app.post('/create', { onRequest: [verifyJWT] }, create)
}