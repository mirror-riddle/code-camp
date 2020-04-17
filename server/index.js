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