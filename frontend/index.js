var express = require('express'),
    path = require('path');

app = express();

// Express configuration.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/:function', function(req, res) {
    res.render('key');
});

app.get('/:function/timerange', function(req, res) {
    console.log(req.query); 
    res.render('keyfromto');
});

app.listen(5000, function() {
    console.log('Client is ready');
});
