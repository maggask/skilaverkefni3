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
    res.render('key');
});

app.listen(5000, function() {
    console.log('Client is ready');
});
