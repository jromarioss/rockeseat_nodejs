import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, expect, it } from 'vitest'

import { GetPetByIdUseCase } from './get-pet-by-id'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pet-repository'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'
import { ResourceNotFoundErro } from '../errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let organizationRepository: InMemoryOrganizationRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationRepository = new InMemoryOrganizationRepository()
    sut = new GetPetByIdUseCase(petsRepository)
  })

  it('should be able to get a pet by id', async () => {
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

    const createPet = await petsRepository.create({
      organization_id: organization.id,
      name: 'Dog test',
      description: 'Some descriptions',
      age: 'YOUNG',
      size: 'MEDIUM',
      habitation: 'BIG',
      energy: 'VERY',
      city: 'Teste city'
    })

    const { pet } = await sut.execute({ id: createPet.id })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.name).toEqual('Dog test')
  })

  it('should not be able to get a pet with wrong id', async () => {
    await expect(() => sut.execute({
        id: 'no-existing-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundErro)
  })
})