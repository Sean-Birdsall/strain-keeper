var request = require('request');
var lame = require('./lame.js');
var Auth = require('./controllers/auth');
var Strain = require('./controllers/strain');
var express = require('express');

module.exports = (app) => {

  app.get('/logout', Auth.logout);

  app.post('/login', Auth.login);

  app.post('/register', Auth.register);

  app.put('/users', Auth.updateUser);

  app.post('/strains', Strain.addStrain);

  app.put('/strains', Strain.updateStrain)

  app.delete('/strains', Strain.deleteStrain)

  app.get('/strains', Strain.getStrains);

  app.get('/profile', Auth.middlewares.session);

  app.get('/user', Auth.findUser);

  app.get('/api/me', (req, res) => {
    res.send(req.session.userId);
  })

  app.get('/api/strains', (req, res) => {
    // set up options object to add api key
    var options = {
      url: `https://www.cannabisreports.com/api/v1.0/strains/search/${encodeURIComponent(req.query.q)}`,
      headers: {
        'X-API-Key': lame.key
      }
    };
    request(options, (err, response, body) => {
      res.end(body);
    });
  });

  app.use(express.static('public'));
}
