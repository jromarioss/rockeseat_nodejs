import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { makeAnswer } from 'test/factories/make-answer'

let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswerRepository)
  })

  it('should be able to delete a answer', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('answer-1'))

    await inMemoryAnswerRepository.create(newAnswer)

    await sut.execute({
      answerId: 'answer-1',
      authorId: 'author-1'
    })
    
    expect(inMemoryAnswerRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a Answer from another user', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-2')
    }, new UniqueEntityId('answer-2'))

    await inMemoryAnswerRepository.create(newAnswer)

    await expect(() => {
      return sut.execute({
        answerId: 'answer-2',
        authorId: 'author-3'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
