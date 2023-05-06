import { FastifyInstance } from 'fastify'

import { register } from './register'
import { authenticate } from './authenticate'
import { refreshToken } from './refresh-token'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refreshToken)
}
