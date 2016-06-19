var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res) {
  res.json({message: 'Hello World'});
});

var server = app.listen(3000, function() {
  console.log('http server listening on http://127.0.0.1:3000/');
});
