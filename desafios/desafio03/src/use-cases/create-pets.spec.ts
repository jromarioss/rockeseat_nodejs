import { describe, beforeEach, it, expect } from 'vitest'

import { CreatePetsUseCase } from './create-pets'
import { PetsRepository } from '@/repositories/pets-repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'

let petsRepository: PetsRepository
let sut: CreatePetsUseCase

describe('Create Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new CreatePetsUseCase(petsRepository)
  })

  it('should be able to create a pet', async () => {
    const { pet } = await sut.execute({
      organization_id: 'fe845aawfw8hdr',
      name: 'Dog test',
      description: 'Some descriptions',
      age: 'YOUNG',
      size: 'MEDIUM',
      habitation: 'BIG',
      energy: 'VERY'
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})