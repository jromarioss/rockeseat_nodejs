import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comments'
import { QuestionCommentsRepository } from '@/domain/forum/application/repositories/question-comments-repository'
import { PaginationParams } from '@/core/repositories/pagination-params'

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string) {
    const question = this.items.find(item => item.id.toString() === id)

    if(!question) {
      return null
    }

    return question
  }

  async findManyByQuestionId(questionId: string, { page }: PaginationParams) {
    const questionComments = this.items.filter(item => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20)

      return questionComments
  }

   async delete(questionComment: QuestionComment) {
     const itemIndex = this.items.findIndex(item => item.id === questionComment.id)

     this.items.splice(itemIndex, 1)
   }
}
