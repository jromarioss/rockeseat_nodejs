import request from 'supertest'
import { FastifyInstance } from 'fastify'

export async function createAndAuthenticateOrganization(app: FastifyInstance) {
  await request(app.server).post('/register').send({
    name: 'Organization Test', 
    owner_name: 'Name Test', 
    email: 'teste@gmail.com', 
    password: '12345678',
    phone: '15123456789', 
    zip_code: 87654321, 
    state: 'TT', 
    city: 'Cerquilho',
    address: 'Rua Testando Test', 
    address_number: 102
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'teste@gmail.com', 
    password: '12345678'
  })

  const { token } = authResponse.body

  return { token }
}
