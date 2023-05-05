import { app } from './app'
import { env } from './env'

app
  .listen({
    // listen retorna um promise
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running')
  })
