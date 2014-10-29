var mongoose = require('mongoose');


var kodemonSchema = new mongoose.Schema({
    execution_time: {type: Number, required: true},
    timestamp: {type: Date, required: true},
    token: {type: String, required: true},
    key: {type: String, required: true}
});

var Kodemon = mongoose.model('Kodemon', kodemonSchema);

module.exports = {'Kodemon': Kodemon};
