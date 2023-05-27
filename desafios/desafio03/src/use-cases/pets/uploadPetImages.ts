import { PetsImagesRepository } from '@/repositories/pets-images'
import { StorageProvider } from '@/providers/StorageProvider/StorageProvider'

interface UploadPetImagesUseCaseRequest {
  petId: string
  imagesName: string[]
}

export class UploadPetImagesUseCase {
  constructor(
    private petsImagesRepository: PetsImagesRepository,
    private storageProvider: StorageProvider
  ) {}

  async execute({ petId, imagesName}: UploadPetImagesUseCaseRequest): Promise<void> {
    const savedPetsImages = await this.petsImagesRepository.findByPetId(petId)

    if(savedPetsImages) {
      savedPetsImages.map(async (item) => {
        await this.storageProvider.delete(item.image_name, 'pets')
      })
    }

    await this.petsImagesRepository.delete(petId)

    imagesName.map(async (image) => {
      await this.petsImagesRepository.create({
        pet_id: petId,
        image_name: image
      })

      await this.storageProvider.save(image, 'pets')
    })
  }
}