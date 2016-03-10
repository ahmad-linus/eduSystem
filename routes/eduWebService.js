/**
 * Created by linus on 3/10/2016 AD.
 */
var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next){
    console.log(path.join(__dirname, '../public/spreadsheets/', 'edu-sample-excel-v3.0.xlsx'));
    res.sendFile(path.resolve(path.join(__dirname, '../public/spreadsheets/', 'excel.xlsx')), function (err) {
        if (err) {
            console.log(err);
            console.log(res.statusCode);
        }
        else {
            console.log('Sent');
        }
    });
});

module.exports = router;
