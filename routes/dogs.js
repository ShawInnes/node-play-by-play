var _ = require('lodash');
var Dog = require('../models/dog.js');

module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log('responding to dog request');
    Dog.find(function(err, dogs) {
      if (err) {
        res.json({ info: 'Error Getting Dogs', error: err });
      }
      res.json({ info: 'Dogs Found', data: dogs });
    });
  });

  app.post('/', function(req, res) {
    var newDog = new Dog(req.body);
    newDog.save(function(err) {
      if (err) {
        res.json({ info: 'Error Creating Dog', error: err });
      }
      res.json({ info: 'Dog Created' });
    });
  });
}
