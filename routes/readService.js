var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

router.get('/:collection/:id', function(req, res, next){
    var item;
    var url = 'mongodb://localhost:27017/test';

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        db.close();
    });

    var fetch = function(db, callback){
        var collectionName = req.params.collection;
        var id = req.params.id;
        var  obj_id = new require('mongodb').ObjectID(req.params.id);
        var cursor = db.collection(collectionName).find({_id : obj_id});
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                res.json(doc);
            } else {
            }
        });
    };

    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        fetch(db);
    });

});


module.exports = router;