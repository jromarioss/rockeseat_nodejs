// tudo q eu recebo de entrada eu encaminho para saída
/* process.stdin // stream leitura
  .pipe(process.stdout) // strem escrita */

import { Readable, Writable, Transform } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => { 
      if (i > 100) {
        this.push(null); // não tenho mais info para ser enviado dentro da stream
      } else {
        const buf = Buffer.from(String(i)); // recebe qual info quero converter em buffer, ñ aceita número

        this.push(buf); // se não envia o i
      }
    }, 1000);
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed))); // 1pr é o error null caso ñ tenha error, 2pr a conversão
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback(); // encerra
  }
}

//new OneToHundredStream().pipe(process.stdout);
//new OneToHundredStream().pipe(new MultiplyByTenStream());
new OneToHundredStream() // ler dados
  .pipe(new InverseNumberStream) // ler o dados e escrever o dados para outro lugar, trabalha no meio
  .pipe(new MultiplyByTenStream()); // escrever dados pra ela