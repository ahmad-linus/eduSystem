/**
 * Created by linus on 3/10/2016 AD.
 */
var express = require('express');
var router = express.Router();


router.get('/edu', function(req, res, next){
    res.send('hello world');
    console.log('edu server reached');
});

module.exports = router;
