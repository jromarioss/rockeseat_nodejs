import { config } from 'dotenv'
import { z } from 'zod'

if (process.env.NODE_ENV === 'test') {
  config({ path: '.env.test' }) //o nome do arquivo vai ser .env.test
} else {
  config() //executa o config sem nada
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'), //enum é uma entre algumas opções
  DATABASE_CLIENT: z.enum(['sqlite', 'pg']),
  DATABASE_URL: z.string(),
  PORT: z.coerce.number().default(3333), //default não é obrigatória
})

//pega o schema passa os dados quem vem de process.env e o zod faz a validação
const _env = envSchema.safeParse(process.env) //o parse da o erro caso de errado
//safeParse é igual o parse só que ele não da o erro case falhe
if (_env.success === false) {
  console.error('Invalid enviroment variable!', _env.error.format()) //para saber qual vrvl está dando error
  throw new Error('Invalid enviroment variables.')
}

export const env = _env.data //data são as vrvl em sí
