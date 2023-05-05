// ?search=Jose
// search=Jose&page=2 dps substr
// ['search=Jose', 'page=2'] dps split

export function extractQueryParams(query) {
  //substr remove primeiro caractere,
  return query.substr(1).split('&').reduce((queryParams, param) => {
    const [key, value] = param.split('='); //faz um array de ['page', '2']

    queryParams[key] = value;

    return queryParams;
  }, {});
}