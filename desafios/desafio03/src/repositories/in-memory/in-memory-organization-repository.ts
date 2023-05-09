import { randomUUID } from 'node:crypto'
import { Prisma, Organization } from '@prisma/client'

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

  async findById(id: string) {
    const organization = this.items.find(item => item.id === id)

    if(!organization) {
      return null
    }

    return organization
  }

  async findOrganizationByEmail(email: string) {
    const organization = this.items.find(item => item.email === email)

    if(!organization) {
      return null
    }

    return organization
  }
  
  async searchMany(query: string) {
    const organizations = this.items.filter(item => item.city.includes(query))

    return organizations
  }
}
