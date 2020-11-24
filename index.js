const fs = require('fs');
const http = require('http');

/*
// sync
const jsText = fs.readFileSync('./store/javascript.txt', 'utf-8');
console.log(jsText);
fs.writeFileSync('./store/testFile.txt', `data`, 'utf-8');

// async
fs.readFile('./store/javascript.txt', 'utf-8', (err, data) => {
  fs.readFile('./store/resolved.txt', 'utf-8', (err, data2) => {
    console.log(`${data}\n${data2}`);
  });
});
*/

const data = fs.readFileSync('./data.json', 'utf-8');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, {
      test: 'TEST-HEADER',
    });
    res.end(data);
  } else if (req.url === '/api') {
    res.end('API PAGE');
  } else {
    res.end('NOT A PAGE');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server Started');
});
