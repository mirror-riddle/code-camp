const http = require('http');
const nodeStatic = require('node-static');

const port = 4000;
const hostname = '127.0.0.1';
const fileServer = new nodeStatic.Server('../client');

const server = http.createServer((req, res) => {
  fileServer.serve(req, res);
});

server.listen(port, hostname, () => {
  console.log(`server runing at http://${hostname}:${port}`);
});
