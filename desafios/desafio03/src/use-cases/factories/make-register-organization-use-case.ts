import { RegisterOrganizationUseCase } from '../organizations/register-organization'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeRegisterOrganizationUseCase() {
  const prismaOrganizationRepository = new PrismaOrganizationsRepository()
  const useCase = new RegisterOrganizationUseCase(prismaOrganizationRepository)

  return useCase
}
