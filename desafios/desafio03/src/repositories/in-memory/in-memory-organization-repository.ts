import { Prisma, Organization } from '@prisma/client'
import { randomUUID } from 'node:crypto'

import { OrganizationsRepository } from '../organizations-repository'

export class InMemoryOrganizationRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async create(data: Prisma.OrganizationCreateInput) {
    const organization: Organization = {
      id: data.id ?? randomUUID(),
      name: data.name,
      owner_name: data.owner_name,
      email: data.email,
      password_hash: data.password_hash,
      phone: data.phone,
      address: data.address,
      address_number: data.address_number,
      city: data.city,
      state: data.state,
      zip_code: data.zip_code,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.items.push(organization)

    return organization
  }

  async findOrganizationByEmail(email: string) {
    const organization = this.items.find(item => item.email === email)

    if(!organization) {
      return null
    }

    return organization
  }
}
