/**
 * Created by linus on 3/11/2016 AD.
 */
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var readService = require('./readService');


var dbConnector = function(func){
    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        func(db);
    });
};

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
    dbConnector(insert);

    //MongoClient.connect(url, function (err, db) {
    //    assert.equal(null, err);
    //    insert(db, function () {
    //        db.close();
    //    });
    //});

    res.send("hi");
});


router.get('/:collection', function (req, res, next) {

    var url = 'mongodb://localhost:27017/test';

    var insert = function (db, callback) {
        var collectionName = req.params.collection;
        var jsonData = JSON.parse(req.query.instance);
        var professor_user = jsonData['professor']['user'];
        var email_query = {"email" : professor_user['email']};

        db.collection('user').update({"email" : professor_user['email']},
            professor_user,
            {"upsert" : "true"});
        var prof_obj_id;
        db.collection('user').find(email_query).each(function(err, doc){
            if (doc != null)
                prof_obj_id = doc["_id"];
        });
        jsonData['professor']['user'] = {"user_id" : prof_obj_id};

        var students = jsonData['students'];

        for (std in students){
            var std_user = students[std]['user'];
            var student_object_id;
            var email_query = {"email" : std_user['email']};
            db.collection('user').update(email_query,
            std_user,
                {"upsert" : "true"});
            db.collection('user').find(email_query).each(function(err, doc){
                if (doc != null)
                    student_object_id = doc["_id"];
            });
            jsonData['students'][std]['user'] = {"user_id" : student_object_id};
        }

        db.collection(collectionName).insertOne(
            jsonData
            , function (err, result) {
                console.log('inserted a document');
            });
    };
    dbConnector(insert);

    //MongoClient.connect(url, function (err, db) {
    //    assert.equal(null, err);
    //    insert(db, function () {
    //        db.close();
    //    });
    //});

    res.send("hi");
});

router.get('/update/:collection/:id', function(req, res){
    var updateDB = function(db){
        var collectionName = req.params.collection;
        var updatedData = JSON.parse(req.query.instance);
        var objID = new require('mongodb').ObjectID(req.params.id);
        db.collection.update({"_id" : objID},
        updatedData);
    };
    dbConnector(updateDB);
});


module.exports = router;
