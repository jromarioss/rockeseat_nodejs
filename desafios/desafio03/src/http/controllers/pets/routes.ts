import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import uploadConfig from '@/config/upload'
import { verifyJWT } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { getPet } from './get-pet'
import { fetchPets } from './fetch-pets'
import { uploadPetImages } from './upload-pet-images'

export async function petsRoutes(app: FastifyInstance) {
  const upload = multer({ storage: uploadConfig.storage})

  app.get('/pet/:id', getPet)
  app.get('/pets', fetchPets)

  app.post('/create', { onRequest: [verifyJWT] }, create)
  app.post('/pet/images/:petId', { 
    preHandler: [upload.array('images')],
    onRequest: [verifyJWT]
  }, uploadPetImages)
}