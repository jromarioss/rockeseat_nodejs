import { randomUUID } from 'node:crypto';

import { Database } from './database.js';
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database();

export const routes = [
  {
    method: 'GET', //método
    path: buildRoutePath('/users'), //caminho
    handler: (req, res) => { //oque vai acontecer
      const { search } = req.query;

      const users = database.select('users', {
        //busca em ambos pelo nome
        name: search,
        email: search,
      });

      return res.end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      database.insert('users', user); //nome da tabela, e depois a listagem

      return res.writeHead(201).end();
    }
  },
  {
    method: 'PUT',
    path: buildRoutePath('/users/:id'), //: é info dinâmico
    handler: (req, res) => {
      const { id } = req.params;
      const { name, email } = req.body;

      database.update('users', id, {
        name,
        email
      });

      return res.writeHead(204).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:id'), //: é info dinâmico
    handler: (req, res) => {
      const { id } = req.params;

      database.delete('users', id); //deleta da tabela users o id

      return res.writeHead(204).end();
    }
  }
];