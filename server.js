// bring in express
var express = require('express');
var Routes = require('./routes.js');
var mongoose = require('mongoose');
var lame = require('./lame.js');
// create an express APP object
var app = express();
var PORT = process.env.PORT || 80;
var bodyParser = require('body-parser');
var sessions = require('client-sessions')({
        cookieName: "strains-session",  // front-end cookie name, currently pulled from package.json, feel free to change
        secret: lame.session,        // the encryption password : keep this safe
        requestKey: 'session',    // req.session,
        duration: (86400 * 1000) * 7, // one week in milliseconds
        cookie: {
            ephemeral: false,     // when true, cookie expires when browser is closed
            httpOnly: true,       // when true, the cookie is not accesbile via front-end JavaScript
            secure: false         // when true, cookie will only be read when sent over HTTPS
        }
    }); // encrypted cookies!



mongoose.connect('mongodb://localhost/strain-keeper');

// instead of writing a GET route for every file going to the client, we can use express to set up a static file server

app.use(sessions);
app.use(bodyParser.json(), bodyParser.urlencoded({extended: true}));

Routes(app);

// listen for connections
app.listen(PORT, (error) => {
  if (error){
    console.log('Server Error: ', error);
  } else {
    console.log("Server up and running!");
  }
});
