var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    if (username === 'hello' && password === 'world') {
      return done(null, { id: 1, username: 'jack', password: 'secret', displayName: 'Jack', emails: [ { value: 'jack@example.com' } ] });
    }
    if (username != 'hello') {
      return done(null, false, { message: 'Incorrect username.' });
    }
    if (password!= 'world') {
      return done(null, false, { message: 'Incorrect password.' });
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = function(app) {
  app.get('/login', function (req, res) {
    res.render('login');
  });

  app.post('/login',
    passport.authenticate('local', { successRedirect: '/',
                                     failureRedirect: '/login' })
  );
}
