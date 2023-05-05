import http from 'node:http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    console.log(transformed);

    callback(null, Buffer.from(String(transformed))); // 1pr é o error null caso ñ tenha error, 2pr a conversão
  }
}

// req => readableStream
// res => writableStream

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunk of req) { // percorre cada pedaço da stream e add no buffer
    buffers.push(chunk);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);
  
  return res.end(fullStreamContent);
  
  /* return req
    .pipe(new InverseNumberStream())
    .pipe() // reencaminha para nossa stream de res */
});

server.listen(3334);