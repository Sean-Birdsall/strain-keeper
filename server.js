// bring in express
var express = require('express');
var request = require('request');
var lame = require('./lame.js');
// create an express APP object
var app = express();

var bodyParser = require('body-parser');

// instead of writing a GET route for every file going to the client, we can use express to set up a static file server
app.use(express.static('public'));

app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

app.get('/api/strains', (req, res) => {

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

// listen for connections
app.listen(process.env.PORT || 3000, () => {
    console.log("Server up and running!");
});
