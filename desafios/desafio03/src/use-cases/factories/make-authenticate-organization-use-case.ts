import { AuthenticateOrganizationUseCase } from '../authenticate-organization'
import { PrismaOrganizationsRepository } from '@/repositories/prisma/prisma-organizations-repository'

export function makeAuthenticateOrganizationUseCase() {
  const prismaOrganizationRepository = new PrismaOrganizationsRepository()
  const useCase = new AuthenticateOrganizationUseCase(prismaOrganizationRepository)

  return useCase
}