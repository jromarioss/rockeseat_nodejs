import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => { 
      if (i > 10) {
        this.push(null); // não tenho mais info para ser enviado dentro da stream
      } else {
        const buf = Buffer.from(String(i)); // recebe qual info quero converter em buffer, ñ aceita número

        this.push(buf); // se não envia o i
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST',
  body: new OneToHundredStream(),
}).then(response => {
  return response.text()
}).then(data => {
  console.log(data);
});