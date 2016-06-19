var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var pets = require('./routes/pets.js')(app);

var server = app.listen(3000, function() {
  console.log('http server listening on http://127.0.0.1:3000/');
});
