import { CreatePetUseCase } from '../pets/create-pets'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeCreatePetsUseCase() {
  const prismaPetsRepository = new PrismaPetsRepository()
  const prismaOrganizationsRepository = new PrismaOrganizationsRepository()
  const useCase = new CreatePetUseCase(prismaPetsRepository, prismaOrganizationsRepository)

  return useCase
}