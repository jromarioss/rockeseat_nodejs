import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answers-repository'
import { QuestionsRepository } from '../repositories/questions-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  authorId: string //se é o author do topico q seleciona melhor resposta
  answerId: string //qual resposta selecionar a melhor
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionsRepository: QuestionsRepository,
    private answersRepository: AnswersRepository,
  ) {}

  async execute({
    answerId, authorId
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)
    
    if(!answer) {
      throw new Error('Answer not found!')
    }

    const question = await this.questionsRepository.findById(answer.questionId.toString())

    if(!question) {
      throw new Error('Question not found!')
    }

    if(authorId !== question.authorId.toString()) {
      throw new Error('Not allowed!')
    }

    question.bestAnswerId = answer.id //seta bestanswerid como id

    await this.questionsRepository.save(question)

    return { question }
  }
}