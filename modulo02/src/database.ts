import { knex as setupknex, Knex } from 'knex'

import { env } from './env'

export const config: Knex.Config = {
  client: env.DATABASE_CLIENT, // qual banco de dado
  connection: env.DATABASE_CLIENT === 'sqlite' ? {
    filename: env.DATABASE_URL
  } : env.DATABASE_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts', //extensão dos arquivos
    directory: './db/migrations', //onde quer salvar as migrations
  }
}

export const knex = setupknex(config)
