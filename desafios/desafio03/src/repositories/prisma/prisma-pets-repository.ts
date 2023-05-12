import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { PetsRepository, SearchPetsQuery } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data })

    return pet
  }

  async getPetById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: { id }
    })

    return pet
  }

  async searchPets({ 
    city, age, energy, habitation, size 
  }: SearchPetsQuery, page: number) {
    const pets = await prisma.pet.findMany({
      where: {
        city,
        age,
        energy,
        habitation,
        size
      },
      take: 20,
      skip: (page - 1) * 20,
    })
    
    return pets
  }
}
