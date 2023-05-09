import { compare } from 'bcryptjs'
import { Organization } from '@prisma/client'

import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { OrganizationsRepository } from '@/repositories/organizations-repository'


interface AuthenticateOrganizationUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateOrganizationUseCaseResponse {
  organization: Organization
}

export class AuthenticateOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {

  }

  async execute({ 
    email, password 
  }: AuthenticateOrganizationUseCaseRequest): Promise<AuthenticateOrganizationUseCaseResponse> {
    const organization = await this.organizationsRepository.findOrganizationByEmail(email)

    if(!organization) {
      throw new InvalidCredentialsError()
    }
    
    const doesPasswordMatch = await compare(password, organization.password_hash)
    
    if(!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return { organization }
  }
}
