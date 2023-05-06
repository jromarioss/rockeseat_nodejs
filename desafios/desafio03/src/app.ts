import fastify from 'fastify'
import { ZodError } from 'zod'

import { fastifyJwt } from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import { env } from '@/env'
import { organizationsRoutes } from './http/controllers/organizations/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  cookie: {
    cookieName: 'refreshToken',
    signed: false
  },
  sign: {
    expiresIn: '1d'
  }
})

app.register(fastifyCookie)

app.register(organizationsRoutes)

app.setErrorHandler((error, _, reply) => {
  if(error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.', 
      issues: error.format()
    })
  }

  if(env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    return reply.status(500).send({
      message: 'Internal server error.'
    })
  }
})
