import { it, expect, beforeAll, afterAll, describe, beforeEach } from 'vitest'
import { execSync } from 'node:child_process'
import request from 'supertest'

import { app } from '../src/app' //app porta de entrada para poder fazer requisições

//beforeEach executa toda vez antes de cada teste caso haja mais de um
//afterAll executa depois de todos os teste
//afterEach executa toda vez depois de cada teste caso haja mais de um

describe('Transactions routes', () => {
  beforeAll(async () => { //executa um código antes que todos os teste executem uma única vez
    await app.ready() //espera que o app esteja pront
  })
  
  afterAll(async () => {
    await app.close() //depois fecha a aplicação
  })

  beforeEach(() => { //zera o db antes de cada teste
    execSync('npm run knex migrate:rollback --all') //zera as db
    execSync('npm run knex migrate:latest') //e depois cria de nv
  })
  
  it('should be able to create a new transactio', async () => {
    const response = await request(app.server) //o supertest recebe o servidor do node
      .post('/transactions') //acessa o method post
      .send({ //e envia os dados
        title: 'New Transaction',
        amount: 5000,
        type: 'credit',
      })
  
    expect(response.statusCode).toEqual(201)
  })

  it('should be able to list all transactions', async () => {
    const createTransactionResponse = await request(app.server).post('/transactions').send({
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie') //para pegar o cookie

    const listTransactionReponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) //set é para enviar algo, o Cookie passando o cookies
      .expect(200)

    //espero que o corpo da listagem seja igual um array, e esse array tnh um obj 
    expect(listTransactionReponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    ])
  })

  it('should be able to get a specific transaction', async () => {
    const createTransactionResponse = await request(app.server).post('/transactions').send({
      title: 'New Transaction',
      amount: 5000,
      type: 'credit',
    })

    const cookies = createTransactionResponse.get('Set-Cookie') //para pegar o cookie

    const listTransactionReponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookies) //set é para enviar algo, o Cookie passando o cookies
      .expect(200)

    //pega a primeira transação e pega o id dela
    const transactionId = listTransactionReponse.body.transactions[0].id

    const getTransactionResponse = await request(app.server)
      .get(`/transactions/${transactionId}`)
      .set('Cookie', cookies) //set é para enviar algo, o Cookie passando o cookies
      .expect(200)

    //espero que o corpo da listagem seja igual um array, e esse array tnh um obj 
    expect(getTransactionResponse.body.transaction).toEqual(
      expect.objectContaining({
        title: 'New Transaction',
        amount: 5000,
      })
    )
  })

  it('should be able to get the summary', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Credit Transaction',
        amount: 5000,
        type: 'credit',
      })

    const cookies = createTransactionResponse.get('Set-Cookie') //para pegar o cookie

    await request(app.server) //cria um nova transação
      .post('/transactions')
      .set('Cookie', cookies) 
      .send({
        title: 'Debit Transaction',
        amount: 2000,
        type: 'debit',
      })

    const summaryResponse = await request(app.server)
      .get('/transactions/summary')
      .set('Cookie', cookies) //set é para enviar algo, o Cookie passando o cookies
      .expect(200)

    //espero que o summary seja igual a 
    expect(summaryResponse.body.summary).toEqual({
      amount: 3000
    })
  })
})
