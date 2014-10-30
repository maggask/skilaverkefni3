var dgram = require("dgram")
    Kodemon = require('./models').Kodemon,
    mongoose = require('mongoose');

// UDP server that receives messages from a Python
// decorator called Kodemon and parses them.

var PORT = process.env.NODE_PORT || 4000;
var HOST = '127.0.0.1';

var server = dgram.createSocket("udp4");

var connectMongo = function() {
    mongoose.connect('mongodb://localhost/kodemondb', {keepAlive: 1});
    console.log('Connecting to mongodb');
};

mongoose.connection.on('disconnected', connectMongo);
connectMongo();

server.on("message", function(msg, remote) {
    console.log('got message from client: ' + msg + '\r\n');
    console.log(remote.address + ':' + remote.port);

    var okBuffer = new Buffer("OK " + msg);
    server.send(okBuffer, 0, okBuffer.length, remote.port, remote.address, 
    function(err, bytes) {
        if (err) {
            console.error("Error sending OK buffer to client", err);
        }
        else {
            console.log("OK sent to client");
        }
    });

    var jsonObject = JSON.parse(msg);

    var data = new Kodemon({
        execution_time: jsonObject.execution_time,
        timestamp: jsonObject.timestamp * 1000,
        token: jsonObject.token,
        key: jsonObject.key
    });

    data.save(function(err) {
        if (err) {
            console.error("Error saving data to mongo database");
        }
        else {
            console.log("Success!");
        }
    });
});

server.on('listening', function() {
    var address = server.address();
    console.log('Kodemon server listening on');
    console.log('hostname: ' + address.address);
    console.log('port: ' + address.port);
});

server.bind(PORT, HOST);
