var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

router.get('/read/:collection/:id', function(req, res, next){
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
        var collection = db.get().collection(collectionName);
        item = collection.find({"_id" : id});
    };

    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        fetch(db, function(){
            db.close();
        });
    });

    res.json(item);
});




module.exports = router;