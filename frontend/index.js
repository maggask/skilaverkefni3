var express = require('express'),
    routes = express.Router(),
    path = require('path'),
    http = require('http'),
    request = require('request'),
    requestify = require('requestify');


app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.get('/', function(req, res) { 
    res.render('index')
});

app.get('/kodemon/index', function(req, res) {
    
    requestify.get("http://localhost:4000/api/entries/keys").then(function(response) {

        var response = response.getBody();

        res.render('keys', {data: response});
    });
});

app.get('/kodemon/index/function', function(req, res) {
    console.log(req);
    var key = req.query.key1;
    requestify.get("http://localhost:4000/api/entries/key/" + key).then(function(response) {

        var response = response.getBody();
        console.log(response);

        res.render('key', {data: response});
    });
});

app.get('/kodemon/index/function/range', function(req, res) {
    console.log(req);
    var key = req.query.key2;
    var from = "/" + req.query.timeFrom;
    var to = "/" + req.query.timeTo;
    requestify.get("http://localhost:4000/api/entries/" + key + from + to).then(function(response) {

        var response = response.getBody();
        console.log(response);

        res.render('keyfromto', {data: response});
    });
});

app.listen(5000, function() {
    console.log('Server is ready');
});
