var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    //console.log('request is ', req);
    var instance = req.get("instance");
    //console.log('instance is ', instance);
    res.send('test worked ... ');
    console.log('instance is ', req.query.instance);
});

module.exports = router;