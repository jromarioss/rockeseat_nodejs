import { FastifyRequest, FastifyReply} from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true }) //verifica se o user está logado onlyCookie olha se exite o refreshtoken

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub //dados do user
      }
    }
  ) //cria o token

  const refreshToken = await reply.jwtSign(
    { role }, 
    {
      sign: {
        sub: request.user.sub,
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
}