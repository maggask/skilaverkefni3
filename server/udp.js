var dgram = require("dgram");

// UDP server that receives messages Python
// decorator called Kodemon and parses them.

var PORT = process.env.NODE_PORT || 4000;
var HOST = '127.0.0.1';

var server = dgram.createSocket("udp4");

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
});

server.on('listening', function() {
    var address = server.address();
    console.log('Kodemon server listening on');
    console.log('hostname: ' + address.address);
    console.log('port: ' + address.port);
});

server.bind(PORT, HOST);
