import { hash } from 'bcryptjs'

import { Organization } from '@prisma/client'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { OrganizationEmailExistsError } from '../errors/organization-email-exists-error'

interface RegisterOrganizationUseCaseRequest {
  name: string
  owner_name: string
  email: string
  password_hash: string
  phone: string
  zip_code: number
  state: string
  city: string
  address: string
  address_number: number
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationRepository: OrganizationsRepository) {}

  async execute({
    name, owner_name, email, password_hash, phone, city, state, zip_code, address, address_number
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const emailAlreadyExists = await this.organizationRepository.findOrganizationByEmail(email)

    if(emailAlreadyExists) {
      throw new OrganizationEmailExistsError()
    }

    const passwordHash = await hash(password_hash, 6)

    const organization = await this.organizationRepository.create({
      name,
      owner_name,
      email,
      password_hash: passwordHash,
      phone,
      address,
      address_number,
      city,
      state,
      zip_code,
    })

    return { organization }
  }
}
