import { Age, Energy, Habitation, Pet, Prisma, Size } from '@prisma/client'

export interface SearchPetsQuery {
  city: string
  age?: Age | undefined
  energy?: Energy | undefined
  size?: Size | undefined
  habitation?: Habitation | undefined
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getPetById(id: string): Promise<Pet | null>
  searchPets(query: SearchPetsQuery, page: number): Promise<Pet[]>
}