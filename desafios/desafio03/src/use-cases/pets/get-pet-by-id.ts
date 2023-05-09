import { Pet } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundErro } from '../errors/resource-not-found-error'

interface GetPetByIdUseCaseRequest {
  petId: string
}

interface GetPetByIdUseCaseResonse {
  pet: Pet
}

export class GetPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ petId }: GetPetByIdUseCaseRequest): Promise<GetPetByIdUseCaseResonse> {
    const pet = await this.petsRepository.getPetById(petId)

    if(!pet) {
      throw new ResourceNotFoundErro
    }

    return { pet }
  }
}