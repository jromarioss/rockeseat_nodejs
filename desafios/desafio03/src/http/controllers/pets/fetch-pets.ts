import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'

import { Age, Energy, Habitation, Size } from '@prisma/client'
import { makeFetchPetsUseCase } from '@/use-cases/factories/make-fetch-pets-use-case'

export async function fetchPets(request: FastifyRequest, reply: FastifyReply) {
  const fetchPetsParamsSchema = z.object({
    city: z.string(),
    page: z.coerce.number().min(1).default(1)
  })

  const { city, page } = fetchPetsParamsSchema.parse(request.params)

  const fetchPetsUseCase = makeFetchPetsUseCase()

  if(request.body) {
    const fetchPetsBodySchema = z.object({
      age: z.nativeEnum(Age).nullable(), 
      size: z.nativeEnum(Size).nullable(), 
      habitation: z.nativeEnum(Habitation).nullable(), 
      energy: z.nativeEnum(Energy).nullable()
    })

    const { age, size, habitation, energy } = fetchPetsBodySchema.parse(request.body)

    const { pets } = await fetchPetsUseCase.execute({
      city,
      page,
      age: age || undefined,
      size: size || undefined,
      habitation: habitation || undefined,
      energy: energy || undefined
    })

    return reply.status(200).send({ pets })
  }

  const { pets } = await fetchPetsUseCase.execute({ city, page })

  return reply.status(200).send({ pets })
}
