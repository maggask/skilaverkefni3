var express = require('express'),
    Kodemon = require('./models').Kodemon,
    mongoose = require('mongoose'),
    elasticsearch = require('elasticsearch');

var client = new elasticsearch.Client({
    host: 'localhost:9200'
});

app = express();

var connectMongo = function() {
    mongoose.connect('mongodb://localhost/kodemondb', {keepAlive: 1});
    console.log('Connecting to mongodb');
};

mongoose.connection.on('disconnected', connectMongo);
connectMongo();

app.get('/api/entries', function(req, res) {
    Kodemon.find({}, '-__v -_id', function(err, entries) {
        res.json(entries);
    });
});

// 1. List all keys (without any values) that have been sent to the server. 
// With the method you would see a list of all the methods
app.get('/api/entries/:keys', function(req, res) {
    console.log(req.body);
    var keys = Kodemon.find({'key': keys}, function(err, keys) {
        if (keys) {
            res.json(keys);
        }
        else {
            res.status(404).send('Not found');
        }
    });
});

// 2. List all execution times for a given key.
app.get('/api/time/:keys', function(req, res) {

});

// 3. List all execution times, for a given key on a given time range.
app.get('/api/time/timerange', function(req, res) {

});

app.listen(4000, function() {
    console.log('Server is ready');
});
