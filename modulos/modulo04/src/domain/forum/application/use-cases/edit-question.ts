import { Either, left, right } from '@/core/either'
import { NotAllowedError } from './error/not-allowed-error'
import { Question } from '../../enterprise/entities/question'
import { ResourceNotFoundError } from './error/resource-not-found-error'
import { QuestionsRepository } from '../repositories/questions-repository'
import { QuestionAttachmentsRepository } from '../repositories/question-attachments-repository'
import { QuestionAttachmentList } from '../../enterprise/entities/question-attachment-list'
import { QuestionAttachment } from '../../enterprise/entities/question-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsId: string[]
}

type EditQuestionUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {question: Question }>

export class EditQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository
    ) {}

  async execute({
    authorId, questionId, title, content, attachmentsId
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if(!question) {
      return left(new ResourceNotFoundError())
    }
    
    if(authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.questionAttachmentsRepository.findManyByQuestionId(questionId)
    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionsAttachments = attachmentsId.map(attachmentId => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        questionId: question.id
      })
    })

    questionAttachmentList.update(questionsAttachments)

    question.attachments = questionAttachmentList
    question.title = title //pega o campo title e coloca o novo title
    question.content = content

    await this.questionsRepository.save(question)

    return right({ question })
  }
}
