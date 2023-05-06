import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply) {
  const sessionId = request.cookies.sessionId //pega dentro de cookie o sessioId

  if (!sessionId) {
    return reply.status(401).send({
      error: 'Unathorized.'
    })
  }
}