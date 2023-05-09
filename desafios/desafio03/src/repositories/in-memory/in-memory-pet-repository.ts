import { randomUUID } from 'node:crypto'
import { Prisma, Pet } from '@prisma/client'
import { PetsRepository, SearchPetsQuery } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

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
      city: data.city,
      created_at: new Date(),
      updated_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async getPetById(id: string) {
    const pet = this.items.find(item => item.id === id)

    if(!pet) {
      return null
    }

    return pet
  }

  async searchPets(queryParams: SearchPetsQuery, page: number) {
    let filteredPets = this.items
      .filter(item => item.city === queryParams.city)
      .slice((page - 1) * 20, page * 20)

    if(queryParams.age) {
      filteredPets = filteredPets.filter(item => item.age === queryParams.age)
    }

    if(queryParams.energy) {
      filteredPets = filteredPets.filter(item => item.energy === queryParams.energy)
    }

    if(queryParams.habitation) {
      filteredPets = filteredPets.filter(item => item.habitation === queryParams.habitation)
    }

    if(queryParams.size) {
      filteredPets = filteredPets.filter(item => item.size === queryParams.size)
    }

    return filteredPets
  }
}