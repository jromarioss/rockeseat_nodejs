const express = require('express');

const app = express();

app.use(express.json());

/* 
  request tudo aqui que vc recebe da requisição
  response tud oaqui que a gente retorna da requisição

  GET - Buscar uma informação dentro do servidor
  POST - Inserir uma informação dentro no servidor
  PUT - Alterar uma informação no servidor
  PATCH - Alterar uma informação específica no servidor
  DELETE - Deletar um informação no servidor

  Routes Params - Identificar um recurso para pode, editar/deletar/buscar = /:id
  Query Params - Paginação / Filtro
  Body Params - Os objetos inserção/alteração
*/

app.get("/courses", (request, response) => {
  const query = request.query; // pega o query courses?page=1&order=desc é opcional
  console.log(query);

  return response.json(["Curso 1", "Curso 2", "Curso 3"]);
});

app.post("/courses", (request, response) => {
  const body = request.body; // pega as informações do body
  console.log(body);
  return response.json(["Curso 1", "Curso 2", "Curso 3", "Curso 4"]);
});

// recebe o dados no parâmetros para alterar
app.put("/courses/:id", (request, response) => {
  const { id } = request.params; // os parâmetros da rota
  console.log(id);

  return response.json(["Curso 6", "Curso 2", "Curso 3", "Curso 4"]);
});

app.patch("/courses/:id", (request, response) => {
  return response.json(["Curso 6", "Curso 7", "Curso 3", "Curso 4"])
});

app.delete("/courses/:id", (request, response) => {
  return response.json(["Curso 6", "Curso 7", "Curso 3"]);
});

// start o express em um porta
app.listen(3333);