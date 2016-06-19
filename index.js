var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var auth = require('./routes/auth.js')(app);
var pets = require('./routes/pets.js')(app);

var server = app.listen(3000, function() {
  console.log('http server listening on http://127.0.0.1:3000/');
});
