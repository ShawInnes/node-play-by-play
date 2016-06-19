var r = require('request').defaults({ json: true });

var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

var async = require('async');

module.exports = function(app) {
  app.get('/',
    function(req, res) {
    async.parallel({
      cat: function(callback) {
        client.get('cat', function(error, cat) {
          if (error) { throw error; }
          if (cat) {
            console.log('reading cat from redis');
            callback(null, JSON.parse(cat));
          } else {
            r({uri: 'http://localhost:3001/'}, function(error, response, body) {
              if (error) {
                callback({service: 'cat', error: error});
              }
              if (!error && response.statusCode === 200) {
                callback(null, body);

                console.log('writing cat to redis');
                client.setex('cat', 10, JSON.stringify(body), function (error) {
                  if (error) { throw error; }
                });
              } else {
                callback(response.statusCode);
              }
            });
          }
        });
      },
      dog: function(callback){
        client.get('dog', function(error, dog) {
          if (error) { throw error; }
          if (dog) {
            console.log('reading dog from redis');
            callback(null, JSON.parse(dog));
          } else {
            r({uri: 'http://localhost:3002/'}, function(error, response, body) {
              if (error) {
                callback({service: 'dog', error: error});
              }
              if (!error && response.statusCode === 200) {
                callback(null, body);

                console.log('writing dog to redis');
                client.setex('dog', 10, JSON.stringify(body), function (error) {
                  if (error) { throw error; }
                });
              } else {
                callback(response.statusCode);
              }
            });
          }
        });
      }
    },
    function(error, results){
      res.json({
        error: error,
        results: results
      });
    });
  });
}
