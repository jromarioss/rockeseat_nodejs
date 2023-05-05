import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'

//partial pega cada umas da propriedades e transforma em opcionais ?
//o overrides pode receber qualquer propriedades do questionprops porem opcionais
export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override,
  }, id) //se for passado é passado como segundo parâmetro

  return answer
}