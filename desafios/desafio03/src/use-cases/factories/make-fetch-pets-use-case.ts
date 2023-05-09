import { FetchPetsUseCase } from '../pets/fetch-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'

export function makeFetchPetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const useCase = new FetchPetsUseCase(prismaPetsRepository)

  return useCase
}