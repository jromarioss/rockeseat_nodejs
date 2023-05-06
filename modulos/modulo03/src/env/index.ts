import 'dotenv/config'
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  PORT: z.coerce.number().default(3333), //coerce pega o dado e converte para o formato q eu coloque na lógica
})

const _env = envSchema.safeParse(process.env) //safeparse tenta validar o process.env

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.format())

  throw new Error('Invalid enviroment variables.')
}

export const env = _env.data //o data trás os dados das variáveis