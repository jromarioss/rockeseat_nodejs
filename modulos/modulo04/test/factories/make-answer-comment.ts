import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { AnswerCommentProps, AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment'

//partial pega cada umas da propriedades e transforma em opcionais ?
//o overrides pode receber qualquer propriedades do questionprops porem opcionais
export function makeAnswerComment(
  override: Partial<AnswerCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = AnswerComment.create({
    authorId: new UniqueEntityId(),
    answerId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override,
  }, id) //se for passado é passado como segundo parâmetro

  return questionComment
}
