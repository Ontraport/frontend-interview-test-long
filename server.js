'use strict';

var express     = require('express');
var app         = express();
var port        = process.env.PORT || 3000;
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/ontraportApp');
app.use(bodyParser.json());

app.use(express.static(__dirname + '/build/'));

require('./server/routes/postRoutes.js')(app);
require('./server/routes/userRoutes.js')(app);

app.listen(port);
console.log('Server started on port: %d', port);
