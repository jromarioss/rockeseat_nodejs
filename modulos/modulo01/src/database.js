import fs from 'node:fs/promises';

//import.meta.url retorna o caminho pro arquivo db
const databasePath = new URL('../db.json', import.meta.url); //envia nome do arquivo, e o caminho

export class Database {
  #database = {} //#manten os métodos privado

  constructor() {
    //leia os arquivos, ai pega os dados e salva dentro do database convertido em json
    fs.readFile(databasePath, 'utf-8')
      .then(data => {
      this.#database = JSON.parse(data);
      })
      .catch(() => { //caso não exista cria o array vazio
        this.#persist()
      });
  }

  #persist() { //método q escreve o bd no arquivo físico
    fs.writeFile(databasePath, JSON.stringify(this.#database)); //converte em string
  }

  select (table, search) { //método de select que recebe a tabelas, e seleciona todo os dado na tabela
    let data = this.#database[table] ?? []; // procura pela table se ñ existir retorna [] vazio

    if (search) {
      data = data.filter(row => { //percorre cada linha das tabelas
        //converte em um array o Object.entries,
        // { name: 'Jose', email: 'Jose' }
        //    key     Value
        //    \/       \/
        // [['name', 'Jose], ['email', 'Jose']]
        return Object.entries(search).some(([key, value]) => {
          return row[key].includes(value); // veja se na linha tem a key com o value
        })
      });
    }

    return data; //retorna os dados
  }

  insert(table, data) { //método de inserir que recebe tabelas e dados,
    if (Array.isArray(this.#database[table])) { //se já existe um array nessa tabela
      this.#database[table].push(data); //adicionar o novo item na tabela
    } else {
      this.#database[table] = [data]; //criar um novo array com um item ali dentro
    }

    this.#persist();

    return data; //retorna o item inserido
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id); //retorna o indice na posição do array q o id bate

    if (rowIndex > -1) { //se for maior que menos 1
      this.#database[table][rowIndex] = { id, ...data }; //envia o id e os dado junto
      this.#persist();
    }
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id); //retorna o indice na posição do array q o id bate

    if (rowIndex > -1) { //se for maior que menos 1
      this.#database[table].splice(rowIndex, 1); //remove uma posição do indice
      this.#persist();
    }
  }
}
