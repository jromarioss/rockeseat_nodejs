import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundErro } from '../errors/resource-not-found-error'

interface GetPetByIdUseCaseRequest {
  id: string
}

interface GetPetByIdUseCaseResonse {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ id }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResonse> {
    const pet = await this.petsRepository.getPetById(id)

    if(!pet) {
      throw new ResourceNotFoundErro
    }

    return { pet }
  }
}