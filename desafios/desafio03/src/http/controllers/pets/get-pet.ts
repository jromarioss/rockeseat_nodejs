import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetPetByIdUseCase } from '@/use-cases/factories/make-get-pet-by-id-use-case'

export async function getPet(request: FastifyRequest, reply: FastifyReply) {
  const getPetParamsSchema = z.object({
    id: z.string()
  })

  const { id } = getPetParamsSchema.parse(request.params)

  const getPetByIdUseCase = makeGetPetByIdUseCase()

  const { pet } = await getPetByIdUseCase.execute({ id })

  return reply.status(200).send({ pet })
}
