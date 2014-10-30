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
app.get('/api/entries/keys', function(req, result) {
    Kodemon.find({}, function(err, keys) {
        if (keys) {
            Kodemon.aggregate([
                {$project: {  
                    key: 1,
                    _id: 0
                }}
            ], function(err, res) {
                if (err) {
                    console.log(err);
                }
                else{
                    console.log(JSON.stringify(res));
                    result.json(res);
                }
            });        
        }
        else {
            res.status(404).send('Not found');
        }
    });
});

// 2. List all execution times for a given key.
app.get('/api/entries/keys/:key', function(req, result) {
    var key = req.params.key;

    Kodemon.find({'key': key}, function(err, k) { 
        if (err) {
            res.status(500).send('Try again later');
        }
        else if (!k) {
            res.status(404).send('No entry with key ' + key);
        }
        else {
            Kodemon.aggregate([
                {$project: {
                    execution_time: 1,
                    _id: 0
                }} 
            ], function(err, res) {

                console.log(JSON.stringify(res));
                result.json(res);
            });
        }
    });
});

// 3. List all execution times, for a given key on a given time range.
app.get('/api/entries/keys/:key/:timefrom/:timeto', function(req, result) {
    var key = req.params.key;
    var timefrom = req.params.timefrom;
    var timeto = req.params.timeto;

    var startTime = new Date(timefrom);
    var endTime = new Date(timeto);

    Kodemon.find({'key': key}, function(err, k) {
        if (err) {
            res.status(500).send('Try again later');
        }
        else if (!k) {
            res.status(404).send('No entry with key ' + key);
        }
        else {
            Kodemon.aggregate([
               {$match: { 
                    timestamp: {
                        $gte: startTime,
                        $lt: endTime
                    }
               }},
               {$project: {
                    execution_time: 1,
                    _id: 0
               }}  
            ], function(err, res) {
                console.log(JSON.stringify(res));
                result.json(res);
            });
        }
    });
});

app.listen(4000, function() {
    console.log('Server is ready');
});
