var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

router.get('/:collection/:id', function(req, res, next){
    var item;
    var url = 'mongodb://localhost:27017/test';

    var fetch = function(db, callback){
        var collectionName = req.params.collection;
        var  obj_id = new require('mongodb').ObjectID(req.params.id);
        var cursor = db.collection(collectionName).find({"_id" : obj_id});

        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                res.json(doc);
            }
        });
    };

    MongoClient.connect(url, function(err, db){
        assert.equal(null, err);
        fetch(db);
    });

});

router.get('/courses/:semester', function(req, res){
    var fetchCoursesBySemester = function(db, callback){
        var semester = req.params.semester;
        var cursor = db.collection('course').find({"semester" : semester});
        var courses = [];
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc != null)
                courses.push(doc);
        });

        res.json(courses);
    }
});

router.get('/courses/:studentID', function(req, res){
   var fetchCoursesByStudentID = function(db, callback){
       var stdId = req.params.studentID;
       var dbCursor = db.collection('course').find({"students.StudentID" : stdId});
       var courses = [];
       cursor.each(function (err, doc){
          assert.equal(err, null);
           if (doc != null)
                courses.push(doc);
       });
   }
});




module.exports = router;