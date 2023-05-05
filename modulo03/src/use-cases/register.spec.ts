import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'

import { RegisterUseCase } from './register'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulando@gmail.com',
      password: '123456'
    })

    //espero que o user tenha um id, toequal espero que teja qualquer string
    expect(user.id).toEqual(expect.any(String))
  })
  
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Fulano',
      email: 'fulando@gmail.com',
      password: '123456'
    })

    //compare compara um senha com um hash já existente
    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'fulando@gmail.com'

    await sut.execute({
      name: 'Fulano',
      email,
      password: '123456'
    })

    //eu espero que na segunda vez ela rejeita e a instancia dela seja do tipo UserAlreayExists
    await expect(() =>
      sut.execute({
        name: 'Fulano',
        email,
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
