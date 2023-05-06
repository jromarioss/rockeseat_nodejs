import { CreatePetsUseCase } from '../create-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeCreatePetsUseCase() {
  const prismaPetRepository = new PrismaPetsRepository()
  const useCase = new CreatePetsUseCase(prismaPetRepository)

  return useCase
}