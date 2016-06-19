var express = require('express');
var app = express();

var mongoose = require('mongoose');
var options = {
  db: { w: 'majority' }
};
mongoose.connect('mongodb://127.0.0.1/dogs', options);

var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var dogs = require('./routes/dogs.js')(app);

var server = app.listen(3002, function() {
  console.log('http server listening on http://127.0.0.1:3002/');
});
