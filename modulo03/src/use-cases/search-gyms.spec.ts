import { expect, describe, it, beforeEach } from 'vitest'

import { SearchGymsUserCase } from './search-gyms'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUserCase

describe('Search Gyms Use Case', () => {

  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUserCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript',
      description: null,
      phone: null,
      latitude: -23.1705951,
      longitude: -47.7639674,
    })

    await gymsRepository.create({
      title: 'Maromba',
      description: null,
      phone: null,
      latitude: -23.1705951,
      longitude: -47.7639674,
    })

    const { gyms } = await sut.execute({
      query: 'Maromba',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Maromba' })
    ])
  })

  it.skip('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Maromba ${i}`,
        description: null,
        phone: null,
        latitude: -23.1705951,
        longitude: -47.7639674,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Maromba',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      //Um primeiro obj contendo, e o segundo contendo
      expect.objectContaining({ title: 'Maromba 21' }),
      expect.objectContaining({ title: 'Maromba 22' }),
    ])
  })
})
