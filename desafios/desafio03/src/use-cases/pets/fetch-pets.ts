import { Pet } from '@prisma/client'
import { PetsRepository, SearchPetsQuery } from '@/repositories/pets-repository'

interface FetchPetsUseCaseRequest extends SearchPetsQuery {
  page: number
}

interface FetchPetsUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, age, energy, habitation, size, page }: FetchPetsUseCaseRequest): Promise<FetchPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchPets({ city, age, energy, habitation, size }, page)

    return { pets }
  }
}
