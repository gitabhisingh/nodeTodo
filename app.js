var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config');
var setupController = require('./controllers/setupController');
var apiController = require('./controllers/apiController');

var port = process.env.PORT || 3000;

app.use('/public', express.static('public'));

app.set('view engine', 'ejs');

app.get('/form', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

mongoose.connect(config.getDbConnectionString());
setupController(app);
apiController(app);

app.listen(port);