var express = require('express'),
    routes = express.Router();


app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(__dirname + '/public'));

app.use('/', routes);

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/kodemon/index', function(req, res) {

});

app.get('/kodemon/function/:function', function(req, res) {

});
