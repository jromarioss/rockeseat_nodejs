import dayjs from 'dayjs'
import { CheckIn } from '@prisma/client'

import { ResourceNotFoundError } from './errors/resource-not-found-error'

import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { LateCheckInValidationError } from './errors/late-check-in-validation-error copy'

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository
  ) {}

  async execute({ checkInId }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    //pega data atual e usa o metodo diff retorna diferença entre 2 datas o 2pr e tipo de distância
    //compara um data do futuro comparado com uma data do passado
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at, 'minutes'
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }

    checkIn.validated_at = new Date() //salva um novo checkIn com uma data nova

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}