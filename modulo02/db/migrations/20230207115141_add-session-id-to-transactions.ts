import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    //after é a posição q vai ficar dps do id, o index cria um indice neste campo da tbl
    table.uuid('session_id').after('id').index()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('session_id')
  })  
}

