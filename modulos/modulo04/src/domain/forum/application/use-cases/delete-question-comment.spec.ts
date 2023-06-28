import { NotAllowedError } from './error/not-allowed-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { DeleteQuestionCommentUseCase } from './delete-question-comment'
import { makeQuestionComment } from 'test/factories/make-question-comment'
import { InMemoryQuestionCommentsRepository } from 'test/repositories/in-memory-question-comments-repository'

let inMemoryQuestionsCommentRepository: InMemoryQuestionCommentsRepository
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionsCommentRepository = new InMemoryQuestionCommentsRepository()
    sut = new DeleteQuestionCommentUseCase(inMemoryQuestionsCommentRepository)
  })

  it('should be able to delete comment on question', async () => {
    const questionComment = makeQuestionComment()

    await inMemoryQuestionsCommentRepository.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString()
    })

    expect(inMemoryQuestionsCommentRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user comment on question', async () => {
    const questionComment = makeQuestionComment({
      authorId: new UniqueEntityId('author-1')
    })

    await inMemoryQuestionsCommentRepository.create(questionComment)

    const result = await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
