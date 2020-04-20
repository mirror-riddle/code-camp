const http = require('http');
const nodeStatic = require('node-static');

const port = 4000;
const fileServer = new nodeStatic.Server('../client');

const server = http.createServer((req, res) => {
  fileServer.serve(req, res);
  if (req.url === '/') {
    res.setHeader('Set-Cookie', [
      `name=hejin; Max-Age=60; Path=/; Domain=127.0.0.1; HttpOnly; SameSite=Lax`,
      'age=28'
    ]);
    return;
  }
  if (req.url.startsWith('/steal-cookie')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = Object.fromEntries(url.searchParams.get('cookie').split('; ').map(pair => pair.split('=')));
    console.log(params);
    res.write('recived');
    res.end();
  }
});

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});

const server1 = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Set-Cookie', [
      `name=hejin; Max-Age=60; Path=/; Domain=127.0.0.1; HttpOnly; SameSite=Lax`,
      'age=28'
    ]);
  }
  if (req.url.startsWith('/cors-cookies')) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    console.log(req.method);
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(url);
    res.write('recived');
    res.end();
  }
});

server1.listen(4001, () => {
  console.log(`server runing at http://localhost:4001`);
});