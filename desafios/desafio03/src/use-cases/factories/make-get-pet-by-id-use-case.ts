import { GetPetByIdUseCase } from '../pets/get-pet-by-id'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeGetPetByIdUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new GetPetByIdUseCase(prismaPetsRepository)

  return useCase
}