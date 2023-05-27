import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsImagesRepository } from '../pets-images'

export class PrismaUploadPetsImagesRepository implements PetsImagesRepository {
  async create(data: Prisma.PetImageUncheckedCreateInput) {
    const petImage = await prisma.petImage.create({ data })

    return petImage
  }

  async findByPetId(petid: string) {
    const petImages = await prisma.petImage.findMany({
      where: { pet_id: petid }
    })

    return petImages
  }

  async delete(petid: string) {
    await prisma.petImage.deleteMany({
      where: { pet_id: petid }
    })
  }
}