import { Pet } from '@prisma/client'
import { PetsRepository, SearchPetsQuery } from '@/repositories/pets-repository'

interface FetchPetsUseCaseRequest {
  queryParams: SearchPetsQuery
  page: number
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ queryParams, page }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchPets(queryParams, page)

    return { pets }
  }
}
