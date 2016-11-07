var request = require('request');
var lame = require('./lame.js');
var Auth = require('./controllers/auth');

module.exports = (app) => {

  // app.get('/login')
  app.post('/login', Auth.login);
  // app.get('/register')
  app.post('/register', Auth.register);

  app.get('/api/strains', (req, res) => {
    // set up options object to add api key
    var options = {
      url: `https://www.cannabisreports.com/api/v1.0/strains/search/${encodeURIComponent(req.query.q)}`,
      headers: {
        'X-API-Key': lame.key
      }
    };
    request(options, (err, response, body) => {
      // console.log(err, response, body);
      res.end(body);
    });
  });

}
