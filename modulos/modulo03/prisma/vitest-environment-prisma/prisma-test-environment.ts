import 'dotenv/config'
import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { PrismaClient } from '@prisma/client'
import { execSync } from 'node:child_process'

//postgresql://docker:docker@localhost:5432/apisolid?schema=public

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema) //substitui o schema por chema que eu estou mandando

  return url.toString()
}

export default <Environment> {
  name: 'prisma',
  async setup() { //qual código quero executar antes do meus testes
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL //sobreescreve as variável por a nova com schema

    execSync('npx prisma migrate deploy') //como se fosse um comando executando no terminal
    return { 
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      }
    } //um metódo que eu quero executar após meus metódos executarem
  },
}