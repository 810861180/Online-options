var express = require('express');
var compression = require('compression');
var app = express();
var port = process.env.NODE_ENV === 'release' ? 8080 : 80
app.use(compression())
app.use(express.static(`./${process.env.NODE_ENV}`))

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})
