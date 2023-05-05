import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'

import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function transactionsRoutes(app: FastifyInstance) {

  app.get('/', {
    preHandler: [checkSessionIdExists], //prehandler vem antes de tudo
  }, async (request) => {
    const { sessionId } = request.cookies //pega o sessionId de dentro do cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return { transactions }
  })

  app.get('/:id', {
    preHandler: [checkSessionIdExists]
  }, async (request) => {
    const getTransactionParamsSchema = z.object({
      id: z.string().uuid(), //um id no formato uuid
    })

    const { id } = getTransactionParamsSchema.parse(request.params)

    const { sessionId } = request.cookies //pega o sessionId de dentro do cookies

    //procura um id igual o id, e o first pq só tem um resultado
    const transaction = await knex('transactions')
      .where({
        session_id: sessionId,
        id
      })
      //.andWhere('session_id', sessionId) //concatenar o where
      .first()

    return { transaction }
  })

  app.get('/summary', {
    preHandler: [checkSessionIdExists]
  }, async (request) => {
    const { sessionId } = request.cookies //pega o sessionId de dentro do cookies
    //.sum soma todos os valores de uma coluna, o 2 pr do sum o as é para dar um nome para a coluna
    const summary = await knex('transactions')
      .where('session_id', sessionId)
      .sum('amount', { as: 'amount' })
      .first()

    return { summary }
  })
  
  app.post('/', async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit']),
    })

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body
    )

    //procura no request dentro do cookies se já existe um sessionId
    let sessionId = request.cookies.sessionId

    if (!sessionId) { //se nã tem cookie cria um
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/', //quais rotas pode acessar os cookie
        // tempo de expiração em milesegundos
        maxAge: 1000 * 60 * 60 * 24 * 7, //7 day
      }) //salva no cookie 1 nome, 2 o valor, 3 tempo de expiração
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      //se for credit dx do jeito que está se for debit ele subtrai dando o valor total
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })
    
    return reply.status(201).send()
  })
}