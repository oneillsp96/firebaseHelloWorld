var express = require('express');        // call express
var app = express();                 // define our app using express
var port = process.env.PORT || 8080;        // set our port
// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log('Magic happens on port ' + port);