import { env } from '@/env'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  //log mostra no log da aplicação os comando sql
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})