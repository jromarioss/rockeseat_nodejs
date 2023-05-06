import { FastifyRequest, FastifyReply} from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  //parse da um throw altomatico no error caso falhar
  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({
      email, password
    })

    const token = await reply.jwtSign(
      {
        role: user.role,
      }, 
      {
        sign: {
          sub: user.id //nunca colocar senha apenas id
        }
      }
    ) //cria o token

    const refreshToken = await reply.jwtSign(
      {
        role: user.role,
      }, 
      {
        sign: {
          sub: user.id,
          expiresIn: '1d',
        }
      }
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/', //quais rotas tem acesso aos cookies o / é todas rotas
        secure: true, //define que o cookie vai ser incripitado atravez do HTTPS
        sameSite: true, //só é acessado dentro do mesmo dominio
        httpOnly: true, //só é acessado atrasves do back-end
      })
      .status(200)
      .send({ token })
    
  } catch(err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({ message: err.message })
    }
    
    throw err //deixa ele lidar com o error
  }
}