var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/api/entries/keys', function(req, res) {
    res.render('keys', {local: {data: req.query.keys}});
});

router.get('/api/entries/key', function(req, res) {
    res.render('key');
});

router.get('/api/entries/key/from/to', function(req, res) {
    res.render('keyfromto');
});

module.exports = router;
