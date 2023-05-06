import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';

//Query parameters: envia no endereço da requisição, URL Stateful => filtro paginação, ñ obrigatório
//http://localhost:3333/users?userId=1&name=Jose o & usa mais parametros

//Route parameters: parametros ñ nomeado e fica na rotas, indentifica recurso
//GET http://localhost:3333/users/1
//DELETE http://localhost:3333/users/1 deletar usuário com id 1

//Request body: envio de informações de um formulário

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => { //procura pele method igual method e o path igual url
    return route.method === method && route.path.test(url); //testa se a regex bate com a url
  });

  if (route) { //caso tenha rota manda o req e res pro handler
    const routeParams = req.url.match(route.path); //dados que a regex retorna

    const { query, ...params } = routeParams.groups; //pega o query e o resto coloca dentro de params

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(3333);
