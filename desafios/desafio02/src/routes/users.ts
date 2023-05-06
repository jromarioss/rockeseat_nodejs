import { z } from 'zod'
import { compare, hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { FastifyInstance } from 'fastify'

import { knex } from '../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function userRoute(app: FastifyInstance) {
  // Create User
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string().min(5, 'Name must be more than 5 characters.'),
      password: z.string().min(5, 'Password must be more than 5 characters.'),
    })

    const { name, password } = createUserBodySchema.parse(request.body)

    const passwordHash = await hash(password, 6)

    const user = await knex('users').insert({
        id: randomUUID(),
        name,
        password: passwordHash,
      }).returning('*')

    const sessionId = user[0].id

    return reply.status(201).cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 // 24h
      })
      .send()
  })

  // Login User
  app.post('/login', async (request, reply) => {
    const requestUserBodySchema = z.object({
      name: z.string(),
      password: z.string()
    })

    const { name, password } = requestUserBodySchema.parse(request.body)

    const user = await knex('users')
      .where('name', name)
      .first()
      .select('id', 'name', 'password')

    if (!user?.name) {
      throw new Error('Name or password wrong!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Name or password wrong!')
    }

    const sessionId = user.id

    return reply.status(200).cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 // 24h
      })
      .send()
  })

  // Summary
  app.get('/summary', { preHandler: [checkSessionIdExists] }, async (request, reply) => {
    const { sessionId } = request.cookies

    const totalOfMeals = await knex('meals')
      .where('user_id', sessionId)
      .count('id', { as: 'totalOfMeals'})
      .first()

    const totalOnDiet = await knex('meals')
      .where({ user_id: sessionId, diet: 'yes'})
      .count('diet', { as: 'totalOnDiet'})
      .first()

    const totalOutDiet = await knex('meals')
      .where({ user_id: sessionId, diet: 'no' })
      .count('diet', { as: 'totalOutDiet' })

    const meals = await knex('meals')
      .where('user_id', sessionId)
      .orderBy('time')
      .select('diet')

    console.log(meals)

    const bestSequenceMeal = meals.map(item => item.diet)

    const minRecovery = 1
    let count = 0
    let recovery = 0

    for(let i = 0; i < bestSequenceMeal.length; i++) {
      if(bestSequenceMeal[i] === 'yes') {
        count++
      }

      if(bestSequenceMeal[i] === 'no') {
        if(count >= minRecovery && count > recovery) {
          recovery = count
        }
        count = 0
      }

      if(count >= minRecovery && count > recovery) {
        recovery = count
      }
    }

    const summary = []

    summary.push(totalOfMeals)
    summary.push(totalOnDiet)
    summary.push(totalOutDiet)
    summary.push({ bestSequenceMeal: recovery })

    return summary
  })
}
