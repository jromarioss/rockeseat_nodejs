import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Question, QuestionProps } from '@/domain/forum/enterprise/entities/question'

//partial pega cada umas da propriedades e transforma em opcionais ?
//o overrides pode receber qualquer propriedades do questionprops porem opcionais
export function makeQuestion(
  override: Partial<QuestionProps> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create({
    authorId: new UniqueEntityId(),
    title: faker.lorem.sentence(), //gerar dados ficticios
    content: faker.lorem.text(),
    ...override,
  }, id) //se for passado é passado como segundo parâmetro

  return question
}