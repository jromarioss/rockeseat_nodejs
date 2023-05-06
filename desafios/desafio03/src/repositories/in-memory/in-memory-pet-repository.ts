import { randomUUID } from 'node:crypto'
import { Prisma, Pet } from '@prisma/client'

import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet: Pet = {
      id: randomUUID(),
      organization_id: data.organization_id,
      name: data.name,
      description: data.description,
      age: data.age,
      size: data.size,
      habitation: data.habitation,
      energy: data.energy,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.pets.push(pet)

    return pet
  }

  async getPetById(id: string) {
    const pet = this.pets.find(item => item.id === id)

    if(!pet) {
      return null
    }

    return pet
  }
}