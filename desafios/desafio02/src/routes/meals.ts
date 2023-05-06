import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function mealsRoutes(app: FastifyInstance) {
  // Create Meal
  app.post('/', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      diet: z.enum(['yes', 'no']),
      time: z.string(),
    })

    const { name, description, diet, time } = createMealBodySchema.parse(request.body)

    let sessionId = request.cookies.sessionId

    await knex('meals').insert({
      id: randomUUID(),
      name,
      description,
      diet,
      time,
      user_id: sessionId,
    })

    return reply.status(201).send({ message: 'Successfully created meal!' })
  })

  // Get all Meals
  app.get('/', { preHandler: [checkSessionIdExists] }, async (request) => {
    const { sessionId } = request.cookies

    const meals = await knex('meals').where('user_id', sessionId).select()

    return { meals }
  })

  // Get one Meal
  app.get('/:id',{ preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = getMealParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    const meal = await knex('meals').where({
        id,
        user_id: sessionId
      })
      .first()

    if(!meal) {
      return reply.status(400).send({ message: 'Meal not found!' })
    }

    return { meal }
  })

  // Edit Meal
  app.patch('/:id', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const getMealSchema = z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      diet: z.enum(['yes', 'no']),
      time: z.string(),
    })

    const { id, name, description, diet, time } = getMealSchema.parse(request.body)

    const { sessionId } = request.cookies

    await knex('meals').where({
        id,
        user_id: sessionId
      })
      .update({
        name, description, diet, time
      })
    
    return reply.status(202).send({ message: 'Successfully edited meal!'})
  })

  // Delete Meal
  app.delete('/:id', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const getMealParamsSchema = z.object({
      id: z.string().uuid(),  
    })

    const { id } = getMealParamsSchema.parse(request.params)

    const { sessionId } = request.cookies

    await knex('meals').where({
        id,
        user_id: sessionId
      })
      .del()
    
    return reply.status(202).send({ message: 'Successfully deleted meal!'})
  })
}