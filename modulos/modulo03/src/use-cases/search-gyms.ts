import { Gym } from '@prisma/client';

import { GymsRepository } from '@/repositories/gyms-repository';

interface SearchGymsUserCaseRequest {
  query: string
  page: number
}

interface SearchGymsUserCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUserCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({ query, page }: SearchGymsUserCaseRequest): Promise<SearchGymsUserCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return { gyms }
  }
}
