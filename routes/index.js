var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;


var url = 'mongodb://localhost:27017/test';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var insert = function (db, callback) {
  db.collection('names').insertOne(
      {"name" : 124}
      , function (err, result) {
        console.log('inserted a document');
      });
};


MongoClient.connect(url, function(err, db){
  assert.equal(null, err);
  insert(db, function(){
    db.close();
  });
});


module.exports = router;