// bring in express
var express = require('express');

// create an express APP object
var app = express();

// instead of writing a GET route for every file going to the client, we can use express to set up a static file server
app.use(express.static(__dirname + '/public'));

// listen for connections
app.listen(process.env.PORT || 3000, function() {
    console.log("Server up and running!");
});
