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

// 1. List all keys (without any values) that have been sent to the server. 
// With the method you would see a list of all the methods
app.get('/api/entries/keys', function(req, res) {
    Kodemon.find({}, '-__v -_id', function(err, keys) {
        if (keys) {
            db.Kodemon.aggregate([
                {$project: {  
                    key: 0
                }}
            ], function(err, res) {
                if (err) {
                    console.log(err);
                }

                console.log(res);
            });
        }
        else {
            res.status(404).send('Not found');
        }
    });
});

// 2. List all execution times for a given key.
app.get('/api/entries/keys/:key', function(req, res) {
    var entry = Kodemon.find({'key': key}, '-__v -_id', function(err, key) { 
        if (entry) {
            db.Kodemon.aggregate([
                
            ], function(err, res) {
                if (err) {
                    console.log(err);
                }

                console.log(res);
            });
        }
        else {
            res.status(404).send('Not found');
        }
    });
});

// 3. List all execution times, for a given key on a given time range.
app.get('/api/time/:key/:timerange', function(req, res) {

});

app.listen(4000, function() {
    console.log('Server is ready');
});
