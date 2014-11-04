var express = require('express'),
    Kodemon = require('./models').Kodemon,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

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
                    //result.render('keys', {data: res});
                    result.header('Access-Control-Allow-Origin', "*")
                    result.send(res);
                }
            });
        }
        else {
            res.status(404).send('Not found');
        }
    });
});

// 2. List all execution times for a given key.
app.get('/api/entries/key/:key', function(req, result) {
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
                {$match: {key: key}},
                {$project: {
                    key: 1,
                    execution_time: 1,
                    timestamp: 1,
                    _id: 0
                }}
            ], function(err, res) {
                //result.render('key', {data: res});
                result.header('Access-Control-Allow-Origin', "*")
                result.send(res);
            });
        }
    });
});

// 3. List all execution times, for a given key on a given time range.
app.get('/api/entries/key/:key/:from/:to', function(req, result) {
    var key = req.params.key;
    var timeFrom = req.params.from;
    var timeTo = req.params.to;
    var startTime = new Date(timeFrom);
    var endTime = new Date(timeTo);

    console.log(startTime);
    console.log(endTime);
    console.log(key);

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
                    key: key,
                    timestamp: {
                        $gte: startTime,
                        $lt: endTime
                    }
               }},
               {$project: {
                    execution_time: 1,
                    timestamp: 1,
                    key: 1,
                    _id: 0
               }}
            ], function(err, res) { 
                console.log(res);
                result.header('Access-Control-Allow-Origin', "*")
                result.send(res);
            });
        }
    });
});

app.listen(4000, function() {
    console.log('Server is ready');
});
