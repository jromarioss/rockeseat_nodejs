// /users/:id

export function buildRoutePath(path) {
  // encontra que começa com :, e com letras de a á z e quetenha mais vezes +, o g vira global
  const routeParametersRegex = /:([a-zA-Z]+)/g; //retorno do indice 1,
  //substitui por uma string, oq pode incluir de txt no lugar parâmetro dinâmico
  const pathWithParmas = path.replaceAll(routeParametersRegex,'(?<$1>[a-z0-9\-_]+)');// oq pode vim n url
  //O $1 pega o retorno na posição 1 e coloca como nome do grupo

  //dps da url eu posso ter, .* pega tudo, \\? para escapar o interogação
  const pathRegex = new RegExp(`^${pathWithParmas}(?<query>\\?(.*))?$`); //^ precisa começa com o, $ precisa terminar

  return pathRegex;
}