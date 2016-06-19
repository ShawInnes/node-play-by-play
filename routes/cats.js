var _ = require('lodash');
var Cat = require('../models/cat.js');

module.exports = function(app) {
  app.get('/', function(req, res) {
    console.log('responding to cat request');
    Cat.find(function(err, cats) {
      if (err) {
        res.json({ info: 'Error Getting Cats', error: err });
      }
      res.json({ info: 'Cats Found', data: cats });
    });
  });

  app.post('/', function(req, res) {
    var newCat = new Cat(req.body);
    newCat.save(function(err) {
      if (err) {
        res.json({ info: 'Error Creating Cat', error: err });
      }
      res.json({ info: 'Cat Created' });
    });
  });
}
