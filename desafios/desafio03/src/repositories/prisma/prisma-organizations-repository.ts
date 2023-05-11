import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async create(data: Prisma.OrganizationCreateInput) {
    const organization = await prisma.organization.create({ data })

    return organization
  }

  async findById(id: string) {
    const organization = await prisma.organization.findUnique({
      where: { id }
    })

    return organization
  }

  async findOrganizationByEmail(email: string){
    const organization = await prisma.organization.findUnique({
      where: { email }
    })

    return organization
  }

  async searchMany(query: string) {
    const organizations = await prisma.organization.findMany({
      where: {
        city: {
          contains: query
        }
      }
    })

    return organizations
  }
}
