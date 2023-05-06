import { expect, describe, it, beforeEach } from 'vitest'

import { CreateGymUseCase } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'JavaScript Gym',
      description: null,
      phone: null,
      latitude: -23.1705951,
      longitude: -47.7639674,
    })

    //espero que o user tenha um id, toequal espero que teja qualquer string
    expect(gym.id).toEqual(expect.any(String))
  })
})
