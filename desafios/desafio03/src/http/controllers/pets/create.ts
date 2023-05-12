import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeCreatePetsUseCase } from '@/use-cases/factories/make-create-pets-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createPetBodySchema = z.object({
    name: z.string(),
    city: z.string(),
    description: z.string(),
    age: z.enum(['CUB', 'YOUNG', 'ADULT']),
    size: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    habitation: z.enum(['SMALL', 'MEDIUM', 'BIG']),
    energy: z.enum(['LITTLE', 'MEDIUM', 'VERY', 'VERY_MUCH']),
  })

  const {
    name, city, description, age, size, habitation, energy
  } = createPetBodySchema.parse(request.body)

  const createPetsUseCase = makeCreatePetsUseCase()

  const { pet } = await createPetsUseCase.execute({
    organization_id: request.user.sub,
    city,
    name,
    description,
    age,
    energy,
    size,
    habitation,
  })

  return reply.status(201).send({ pet })
}
