const express = require('express');
const { v4: uuidV4 } = require('uuid'); // : renomeia

const app = express();

app.use(express.json());

// banco de dados customers
const customers = [];

/* 
  cpf - string
  name - string
  id - uuid
  statement - estrato da conta []
*/

// Middleware é aquilo que fica no meio o next descide se o middleware vai para frente
function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers; // pega o cpf do headers

  // o find retorna a informação completa
  const customer = customers.find(customer => customer.cpf === cpf); // procurar o cpf igual o cpf e retorna

  // se o customer não existir
  if (!customer) {
    return response.status(400).json({ error: "Customer not found!"});
  }

  // liberar o customer para acessar do lado de fora
  request.customer = customer;

  return next(); // se existe um conta libera
}

function getBalance(statement) { // vai receber o statement como parâmetro
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') { // se a operação for igual a crédito retorna
      return acc + operation.amount; // acc + a quantia
    } else {
      return acc - operation.amount; // acc - a quantia
    }
  }, 0); // o acc começa em 0

  return balance; // e retorna o balance
}

// app.use(verifyIfExistsAccountCPF); tudo que estiver abaixo vai passar pelo middleware

// Criar conta
app.post("/account", (request, response) => {
  const { cpf, name } = request.body; // pega o cpf e name do body

  // verificação se existe usuário, some retorna true ou false se existir
  const customerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf // veja se customer tem cpf igual ao cpf
  );
  
  // se já existir usuário da o error
  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists!"});
  }

  // inserir dados dentro da array
  customers.push({
    cpf,
    name,
    id: uuidV4(), // gerar o id aleatório
    statement: []
  });

  return response.status(201).send(); // 201 created OK
});

// Procurar conta
app.get("/statement", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request; // pegar o customer do middleware

  return response.json(customer.statement);
});

// deposito
app.post("/deposit", verifyIfExistsAccountCPF, (request, response) => {
  const { description, amount } = request.body; // pegar descrição e quantia de deposito
  const { customer } = request; // pegar o customer do middleware

  const statementOperation = { // operação de deposito
    description,
    amount,
    created_at: new Date(),
    type: "credit"
  }

  // enviando o deposito para o customer em statement
  customer.statement.push(statementOperation);

  return response.status(201).send();
});

// saque de dinheiro
app.post("/withdraw", verifyIfExistsAccountCPF, (request, response) => {
  const { amount } = request.body; // pega do body a quantia
  const { customer } = request; // pegar o customer do middleware

  const balance = getBalance(customer.statement); // pega o statement e manda pro getBalance

  if (balance < amount) { // se o balance for menor que o amount da error
    return response.status(400).json({ error: "Insufficient funds!"});
  }

  const statementOperation = { // operação de saque
    amount,
    created_at: new Date(),
    type: "debit"
  }

  customer.statement.push(statementOperation); // manda o novo valor para o statement

  return response.status(201).send();
});

// buscar deposito por data
app.get("/statement/date", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request; // pegar o customer do middleware
  const { date } = request.query; // pega a data dentro do query

  // converte a date
  const dateFormat = new Date(date + " 00:00"); // para pegar o dia e a hora

  // filter retorna só oque se pede
  const statement = customer.statement.filter((statement) => statement.created_at.toDateString() === new Date(dateFormat).toDateString()); // veja se a data é igual a data do statement

  return response.json(statement);
});

// atualizar nome da conta
app.put("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { name } = request.body; // pegar o nome do body
  const { customer } = request; // pegar o customer do middleware

  customer.name = name;

  return response.status(201).send();
});

// obter os dados da conta
app.get("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request; // pegar o customer do middleware

  return response.json(customer);
});

// deletar uma conta
app.delete("/account", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request; // pegar o customer do middleware

  // splice 1pr o customer e o 2 pr até onde quer que ele remova
  customers.splice(customer, 1);

  return response.status(200).json(customers);
});

// retorna o balance
app.get("/balance", verifyIfExistsAccountCPF, (request, response) => {
  const { customer } = request;

  const balance = getBalance(customer.statement); // pega o balance do getBalance

  return response.json(balance);
});

app.listen(3333);