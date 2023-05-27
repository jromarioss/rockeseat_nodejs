import { PetImage, Prisma } from '@prisma/client'

export interface PetsImagesRepository {
  create(data: Prisma.PetImageUncheckedCreateInput): Promise<PetImage>
  findByPetId(petid: string): Promise<PetImage[]>
  delete(petid: string): Promise<void>
}