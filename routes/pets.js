var r = require('request').defaults({ json: true });

var async = require('async');

module.exports = function(app) {
  app.get('/', function(req, res) {
    async.parallel({
      cat: function(callback) {
        r({uri: 'http://localhost:3001/'}, function(error, response, body) {
          if (error) {
            callback({service: 'cat', error: error});
          }
          if (!error && response.statusCode === 200) {
            callback(null, response.body);
          } else {
            callback(response.statusCode);
          }
        });
      },
      dog: function(callback){
        r({uri: 'http://localhost:3002/'}, function(error, response, body) {
          if (error) {
            callback({service: 'dog', error: error});
          }
          if (!error && response.statusCode === 200) {
            callback(null, response.body);
          } else {
            callback(response.statusCode);
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
