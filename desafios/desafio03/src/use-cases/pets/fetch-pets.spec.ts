import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { describe, beforeEach, it, expect } from 'vitest'

import { CreatePetUseCase } from './create-pets'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { FetchPetsUseCase } from './fetch-pets'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: FetchPetsUseCase

describe('Fetch Pets', () => {
  beforeEach(async () => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new FetchPetsUseCase(petsRepository)

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

    await petsRepository.create({
      organization_id: organization.id,
      name: 'Doguinho',
      age: 'YOUNG',
      description: 'Cachorrinho fofo',
      size: 'MEDIUM',
      energy: 'MEDIUM',
      habitation: 'MEDIUM',
      city: 'Teste city'
    })

    await petsRepository.create({
      organization_id: organization.id,
      name: 'Doguinho 2',
      age: 'YOUNG',
      description: 'Cachorrinho fofo 2',
      size: 'MEDIUM',
      energy: 'MEDIUM',
      habitation: 'MEDIUM',
      city: 'Teste city'
    })

    await petsRepository.create({
      organization_id: organization.id,
      name: 'Doguinho 3',
      age: 'CUB',
      description: 'Cachorrinho fofo 3',
      size: 'SMALL',
      energy: 'VERY',
      habitation: 'MEDIUM',
      city: 'Teste city'
    })

    await petsRepository.create({
      organization_id: organization.id,
      name: 'Doguinho 3',
      age: 'YOUNG',
      description: 'Cachorrinho fofo 3',
      size: 'MEDIUM',
      energy: 'MEDIUM',
      habitation: 'MEDIUM',
      city: 'Teste city 2'
    })
  })

  it('should be able to fetch pets from city', async () => {
    const { pets } = await sut.execute({
      queryParams: { city: 'Teste city 2'},
      page: 1
    })

    expect(pets).toHaveLength(1)
  })

  it('should be able to fetch pets by age', async () => {
    const { pets } = await sut.execute({
      queryParams: {
        city: 'Teste city',
        age: 'YOUNG',
      },
      page: 1
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch pets by energy', async () => {
    const { pets } = await sut.execute({
      queryParams: {
        city: 'Teste city',
        energy: 'MEDIUM',
      },
      page: 1
    })

    expect(pets).toHaveLength(2)
  })

  it('should be able to fetch pets by habitation', async () => {
    const { pets } = await sut.execute({
      queryParams: {
        city: 'Teste city',
        habitation: 'MEDIUM',
      },
      page: 1
    })

    expect(pets).toHaveLength(3)
  })

  it('should be able to fetch pets by size', async () => {
    const { pets } = await sut.execute({
      queryParams: {
        city: 'Teste city',
        size: 'SMALL',
      },
      page: 1
    })

    expect(pets).toHaveLength(1)
  })
})