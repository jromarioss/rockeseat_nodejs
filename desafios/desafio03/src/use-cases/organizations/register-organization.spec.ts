import { compare, hash } from 'bcryptjs'
import { describe, beforeEach, it, expect } from 'vitest'

import { RegisterOrganizationUseCase } from './register-organization'
import { OrganizationEmailExistsError } from '../errors/organization-email-exists-error'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let organizationsRepository: InMemoryOrganizationRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('Should be able to register a organization', async () => {
    const { organization } = await sut.execute({
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

    expect(organization.id).toEqual(expect.any(String))
  })

  it('Should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Organization Test', 
      owner_name: 'teste name', 
      email: 'teste@gmail.com', 
      password_hash: 'teste123',
      phone: '15996923425', 
      zip_code: 18526287, 
      state: 'SP', 
      city: 'Teste city', 
      address: 'Rua testando teste', 
      address_number: 121
    })

    const isPasswordCorrectlyHashed = await compare('teste123', organization.password_hash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Organization Test', 
      owner_name: 'teste name', 
      email: 'teste@gmail.com', 
      password_hash: 'teste123',
      phone: '15996923425', 
      zip_code: 18526287, 
      state: 'SP', 
      city: 'Teste city', 
      address: 'Rua testando teste', 
      address_number: 121
    })

    await expect(() => 
      sut.execute({
        name: 'Organization Test', 
        owner_name: 'teste name', 
        email: 'teste@gmail.com', 
        password_hash: 'teste123',
        phone: '15996923425', 
        zip_code: 18526287, 
        state: 'SP', 
        city: 'Teste city', 
        address: 'Rua testando teste', 
        address_number: 121
      })
    ).rejects.toBeInstanceOf(OrganizationEmailExistsError)
  })
})