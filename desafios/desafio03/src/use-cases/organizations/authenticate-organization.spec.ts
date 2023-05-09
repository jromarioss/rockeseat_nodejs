import { hash } from 'bcryptjs'
import { describe, beforeEach, it, expect } from 'vitest'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateOrganizationUseCase } from './authenticate-organization'
import { InMemoryOrganizationRepository } from '@/repositories/in-memory/in-memory-organization-repository'

let organizationsRepository: InMemoryOrganizationRepository
let sut: AuthenticateOrganizationUseCase

describe('Authenticate Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationRepository()
    sut = new AuthenticateOrganizationUseCase(organizationsRepository)
  })

  it('Should be able to authenticate', async () => {
    await organizationsRepository.create({
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

    const { organization } = await sut.execute({
      email: 'teste@gmail.com',
      password: 'teste123'
    })

    expect(organization.id).toEqual(expect.any(String))
  })

  it('Shoud not be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
        email: 'teste@gmail.com',
        password: 'teste123'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Shoud not be able to authenticate with wrong password', async () => {
    await organizationsRepository.create({
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

    await expect(() => sut.execute({
      email: 'test@gmail.com',
      password: 'test123'
    })
  ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})