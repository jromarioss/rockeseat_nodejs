import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { transactionsRoutes } from './routes/transactions'

export const app = fastify()

app.register(cookie)

/* app.addHook('preHandler', async (request, reply) => {
  console.log(`[${request.method} ${request.url}]`);
}) //middleware global */

app.register(transactionsRoutes, {
  prefix: '/transactions', //assim todas rotas que começa con trns.. cai nesse plugin
})