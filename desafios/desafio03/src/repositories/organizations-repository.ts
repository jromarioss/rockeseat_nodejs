import { Organization, Prisma } from '@prisma/client'

export interface OrganizationsRepository {
  create(data: Prisma.OrganizationCreateInput): Promise<Organization>
  findOrganizationByEmail(email: string): Promise<Organization | null>
}
