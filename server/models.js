var mongoose = require('mongoose');


var kodemonSchema = new mongoose.Schema({
    execution_time: Number,
    timestamp: Date,
    token: String,
    key: String
});

var Kodemon = mongoose.model('Kodemon', kodemonSchema);

module.exports = {'Kodemon': Kodemon};
