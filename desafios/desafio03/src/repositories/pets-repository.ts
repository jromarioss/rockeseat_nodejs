import { Age, Energy, Habitation, Pet, Prisma, Size } from '@prisma/client'

export interface SearchPetsQuery {
  city: string
  age?: Age
  energy?: Energy
  size?: Size
  habitation?: Habitation
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  getPetById(id: string): Promise<Pet | null>
  searchPets({ city, age, energy, habitation, size }: SearchPetsQuery, page: number): Promise<Pet[]>
}