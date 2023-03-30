"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 3000;
var router = require('./routes/users.js');
app.use(bodyParser.json());
app.use('/', router);
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(port, function () {
  console.log("Server is running on http://localhost:".concat(port));
});