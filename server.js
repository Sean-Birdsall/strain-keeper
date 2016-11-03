// bring in express
var express = require('express');
var Routes = require('./routes.js');
// create an express APP object
var app = express();
var PORT = process.env.PORT || 3000;

var bodyParser = require('body-parser');

// instead of writing a GET route for every file going to the client, we can use express to set up a static file server
app.use(express.static('public'));

app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

Routes(app);

// listen for connections
app.listen(PORT, '192.168.173.116', (error) => {
  if (error){
    console.log('Server Error: ', error);
  } else {
    console.log("Server up and running!");
  }
});
