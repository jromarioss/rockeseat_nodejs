import { Age, Energy, Habitation, Pet, Size } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'

interface ICreatePetsUseCaseRequest {
  organization_id: string,
  name: string
  description: string
  age: Age
  size: Size
  habitation: Habitation
  energy: Energy
}

interface ICreatePetsUseCaseResponse {
  pet: Pet
}

export class CreatePetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    organization_id, name, description, age, size, habitation, energy
  }: ICreatePetsUseCaseRequest): Promise<ICreatePetsUseCaseResponse> {
    const pet = await this.petsRepository.create({
      organization_id, name, description, age, size, habitation, energy
    })

    return { pet }
  }
}