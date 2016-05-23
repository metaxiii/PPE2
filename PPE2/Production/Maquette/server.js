var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

var writelog = require('./server/common/writelog').writelog;
var config = require('./server/common/config').config;

var PORT = config.PORT;
var app = express();

mongoose.connect('mongodb://localhost/ppe2');

// Used for production build
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

require('./server/routes/routes')(app);

app.all('*', function(req, res){
    res.send('' +
    '<!DOCTYPE html>' +
    '<html>' +
        '<head>' +
            '<meta charset="utf-8" />' +
            '<title>Maison des ligues de lorraine</title>' +
            '<base href="/" />' +
        '</head>' +
        '<body>' +
            '<md-content>' +
                '<div ui-view class="container"></div>' +
                '<script src="bundle.js"></script>' +
            '</md-content>' +
        '</body>' +
    '</html>')
});

app.listen(PORT, function(){
    var TYPE = 'SERVER START';
    writelog('Server started successfully', TYPE);
    console.log("Server running on " + PORT);
});