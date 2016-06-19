var http = require('http');
var express = require('express');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end('{ "message": "Hello World!" }');
}).listen(3000, '127.0.0.1');

console.log('http server listening on http://127.0.0.1:3000/');
