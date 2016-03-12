/**
 * Created by linus on 3/11/2016 AD.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

router.get('/:collection', function (req, res, next) {

    var url = 'mongodb://localhost:27017/test';

    var insert = function (db, callback) {
        var collectionName = req.params.collection;
        var jsonData = JSON.parse(req.query.instance);

        db.collection(collectionName).insertOne(
            jsonData
            , function (err, result) {
                console.log('inserted a document');
            });
    };


    MongoClient.connect(url, function (err, db) {
        assert.equal(null, err);
        insert(db, function () {
            db.close();
        });
    });

    res.send("hi");
});

module.exports = router;
