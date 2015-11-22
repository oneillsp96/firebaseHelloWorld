var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

// serve files out of ./public as our main files
app.use(express.static(__dirname + '/public'));
app.listen(port);
console.log('Magic happens on port ' + port);