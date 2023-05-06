import { FastifyRequest, FastifyReply} from 'fastify'
import { z } from 'zod'

import { makeCreateGymUseCase } from '@/use-cases/factories/make-create-gym-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createGymsBodySchema = z.object({
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine(value => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine(value => {
      return Math.abs(value) <= 180
    }),
  })

  //parse da um throw altomatico no error caso falhar
  const { title, description, latitude, longitude, phone } = createGymsBodySchema.parse(request.body)

  const createGymUseCase = makeCreateGymUseCase()

  await createGymUseCase.execute({
    title, description, phone, latitude, longitude
  })

  return reply.status(201).send()
}