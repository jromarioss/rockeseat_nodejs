import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'

import { makeUploadPetImagesUseCase } from '@/use-cases/factories/make-update-pet-images-use-case'

interface FilesProps {
  filename: string
}

export async function uploadPetImages(request: FastifyRequest, reply: FastifyReply) {
  const uploadPetImagesParamsSchema = z.object({
    petId: z.string()
  })

  const { petId } = uploadPetImagesParamsSchema.parse(request.params)

  const images = request.files as FilesProps[]

  const uploadePetImagesUseCase = makeUploadPetImagesUseCase()

  const fileNames = images.map((file) => file.filename)

  uploadePetImagesUseCase.execute({ petId, imagesName: fileNames })

  return reply.status(201).send()
}