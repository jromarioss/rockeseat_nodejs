import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { describe, beforeEach, it, expect } from 'vitest'

import { CreatePetUseCase } from './create-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: CreatePetUseCase

describe('Create Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new CreatePetUseCase(petsRepository, organizationRepository)
  })

  it('should be able to create a pet', async () => {
    const organization = await organizationRepository.create({
      id: randomUUID(),
      name: 'Organization Test', 
      owner_name: 'teste name', 
      email: 'teste@gmail.com', 
      password_hash: await hash('teste123', 6),
      phone: '15996923425', 
      zip_code: 18526287, 
      state: 'SP', 
      city: 'Teste city', 
      address: 'Rua testando teste', 
      address_number: 121
    })

    const { pet } = await sut.execute({
      organization_id: organization.id,
      name: 'Doguinho',
      age: 'YOUNG',
      description: 'Cachorrinho fofo',
      size: 'MEDIUM',
      energy: 'MEDIUM',
      habitation: 'MEDIUM',
      city: 'Teste city'
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})