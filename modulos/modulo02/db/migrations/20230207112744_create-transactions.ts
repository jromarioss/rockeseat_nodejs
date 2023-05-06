import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  //cria a tabela 1 nome, 2 um função com um pr table
  await knex.schema.createTable('transactions', (table) => {
    //colunar tipo uuid ai da o nome
    table.uuid('id').primary()
    table.text('title').notNullable() //não pode ficar vazio
    table.decimal('amount', 10, 2).notNullable() //um decimanl com tamanho de 10numeros e 2 decimal
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable() //data criaçãoS
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('transactions')
}
