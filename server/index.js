const http = require('http');
const nodeStatic = require('node-static');
const formidable = require('formidable');

const port = 4000;
const fileServer = new nodeStatic.Server('../client');

const server = http.createServer((req, res) => {
  if (req.url.startsWith('/steal-cookie')) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const params = Object.fromEntries(
      url.searchParams
        .get('cookie')
        .split('; ')
        .map((pair) => pair.split('='))
    );
    console.log(params);
    res.write('recived');
    res.end();
    return;
  }
  if (req.url.startsWith('/upload')) {
    const form = formidable({ multiples: true });
    form.parse(req, (error, fields, files) => {
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });
    return;
  }
  fileServer.serve(req, res);
});

server.listen(port, () => {
  console.log(`server runing at http://localhost:${port}`);
});

const server1 = http.createServer((req, res) => {
  if (req.url === '/') {
    res.setHeader('Set-Cookie', [
      `name=hejin; Max-Age=60; Path=/; Domain=127.0.0.1; HttpOnly; SameSite=Lax`,
      'age=28',
    ]);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Content-Disposition', 'inline; filename="index.html"');
    res.write('<p>hello world</p>');
    res.end();
    return;
  }
  if (req.url.startsWith('/cors-cookies')) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'Authorization');
    res.setHeader(
      'Access-Control-Expose-Headers',
      'Access-Control-Allow-Origin, Access-Control-Allow-Credentials, Authorization'
    );
    res.setHeader('Access-Control-Max-Age', 300);
    console.log(req.method);
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log(res.getHeaders());
    res.write('recived');
    res.end();
    return;
  }
});

server1.listen(4001, () => {
  console.log(`server runing at http://localhost:4001`);
});
