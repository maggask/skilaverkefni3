var express = require('express),
    mongoose = require('mongoose'),
    elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

app = express();

var connectMongo = function() {
    mongoose.connect('mongodb://localhost/test', {keepAlive: 1});
    console.log('Connecting to mongodb');
};

mongoose.connection.on('disconnected', connectMongo);
connectMongo();

app.get('/api/', function(req, res) {

});
