var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/cats');

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var cats = require('./routes/cats.js')(app);

var server = app.listen(3001, function() {
  console.log('http server listening on http://127.0.0.1:3001/');
});
