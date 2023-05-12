import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { Age, Energy, Habitation, Size } from '@prisma/client'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsQuerySchema = z.object({
    city: z.string(),
    age: z.nativeEnum(Age).optional(),
    energy: z.nativeEnum(Energy).optional(),
    habitation: z.nativeEnum(Habitation).optional(),
    size: z.nativeEnum(Size).optional(),
    page: z.coerce.number().min(1).default(1)
  })

  const { 
    city, age, energy, habitation, size, page 
  } = fetchPetsQuerySchema.parse(request.query)

  const queryParams = {
    city, age, energy, habitation, size
  }

  const fetchPetsUseCase = makeFetchPetsUseCase()

  const { pets } = await fetchPetsUseCase.execute({ queryParams, page })

  return reply.status(200).send({ pets })
}
