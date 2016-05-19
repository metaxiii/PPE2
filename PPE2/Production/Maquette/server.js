var express = require('express');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 1000;
var app = express();

var User = require('./server/db/user');

// Used for production build
// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.put('/user', function(req, res){
    // Add callback
    console.log('Register user request.');
    User.registerUser(req.body.newUser);
});

app.all('*', function(req, res){
    res.send('' +
    '<!DOCTYPE html>' +
    '<html>' +
        '<head>' +
            '<meta charset="utf-8" />' +
            '<title></title>' +
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
    console.log("Server running on " + PORT);
});