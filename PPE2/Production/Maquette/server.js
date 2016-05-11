var express = require('express');
var PORT = process.env.PORT || 1000;
var app = express();

// Used for production build
// app.use(express.static(path.join(__dirname, 'public')));

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
            '<div ui-view class="container"></div>' +
            '<script src="bundle.js"></script>' +
        '</body>' +
    '</html>')
});

app.listen(PORT, function(){
    console.log("Server running on " + PORT);
});