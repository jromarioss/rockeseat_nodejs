import { faker } from '@faker-js/faker'

import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { QuestionComment, QuestionCommentProps } from '@/domain/forum/enterprise/entities/question-comments'

//partial pega cada umas da propriedades e transforma em opcionais ?
//o overrides pode receber qualquer propriedades do questionprops porem opcionais
export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create({
    authorId: new UniqueEntityId(),
    questionId: new UniqueEntityId(),
    content: faker.lorem.text(),
    ...override,
  }, id) //se for passado é passado como segundo parâmetro

  return questionComment
}
