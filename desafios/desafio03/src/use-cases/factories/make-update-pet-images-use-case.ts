import { UploadPetImagesUseCase } from '../pets/uploadPetImages'
import { LocalStorageProvider } from '@/providers/StorageProvider/implementations/LocalStorageProvider'
import { PrismaUploadPetsImagesRepository } from '@/repositories/prisma/prisma-upload-pets-images-repository'

export function makeUploadPetImagesUseCase() {
  const prismaUploadPetsImages = new PrismaUploadPetsImagesRepository()
  const storageProvider = new LocalStorageProvider()
  const uploadPetImagesUseCase = new UploadPetImagesUseCase(
    prismaUploadPetsImages, storageProvider
  )

  return uploadPetImagesUseCase
}