import { Age, Energy, Habitation, Pet, Size } from '@prisma/client'

import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFoundErro } from '../errors/resource-not-found-error'
import { OrganizationsRepository } from '@/repositories/organizations-repository'

interface CreatePetUseCaseRequest {
  organization_id: string,
  name: string
  description: string
  age: Age
  size: Size
  habitation: Habitation
  energy: Energy
  city: string
}

interface CreatePetUseCaseResponse {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository
    ) {}

  async execute({
    organization_id, name, description, age, size, habitation, energy, city
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(organization_id)

    if(!organization) {
      throw new ResourceNotFoundErro()
    }

    const pet = await this.petsRepository.create({
      organization_id: organization.id,
      name, 
      description, 
      age, 
      size, 
      habitation, 
      energy,
      city
    })

    return { pet }
  }
}
