import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerOrganizationBodySchema = z.object({
    name: z.string(),
    owner_name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string(),
    zip_code: z.coerce.number(),
    state: z.string().min(2).max(2),
    city: z.string(),
    address: z.string(),
    address_number: z.coerce.number(),
  })

  const {
    name,
    owner_name,
    email,
    password,
    phone,
    zip_code,
    state,
    city,
    address,
    address_number
  } = registerOrganizationBodySchema.parse(request.body)

  const registerOrganizationUseCase = makeRegisterOrganizationUseCase()

  const { organization } = await registerOrganizationUseCase.execute({
    name,
    owner_name,
    email,
    password_hash: password,
    phone,
    zip_code,
    state,
    city, 
    address,
    address_number
  })

  return reply.status(201).send({ organization })
}
