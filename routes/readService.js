var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var url = 'mongodb://localhost:27017/test';

var dbConnector = function(func){
    MongoClient.connect(url, function(err, db){
       assert.equal(null, err);
       func(db);
    });
};

router.get('/:collection/:id', function(req, res, next){
    var fetch = function(db, callback){
        var collectionName = req.params.collection;
        var  obj_id = new require('mongodb').ObjectID(req.params.id);
        var cursor = db.collection(collectionName).find({"_id" : obj_id});

        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null)
                res.json(doc);
        });
    };
    dbConnector(fetch);
});

router.get('/courses/semesters/:semester', function(req, res){
    var fetchCoursesBySemester = function(db, callback){
        var semester = req.params.semester;
        var cursor = db.collection('course').find({"semester" : semester});
        var courses = [];
        console.log(cursor);
        cursor.each(function (err, doc) {
            assert.equal(err, null);
            if (doc != null)
                courses.push(doc);
        });
        res.json(courses);
    };
    dbConnector(fetchCoursesBySemester);
});

router.get('/courses/student/:studentID', function(req, res){
   var fetchCoursesByStudentID = function(db, callback){
       var stdId = req.params.studentID;
       var dbCursor = db.collection('course').find({"students.StudentID" : stdId});
       var courses = [];
       dbCursor.each(function (err, doc){
          assert.equal(err, null);
           if (doc != null)
                courses.push(doc);
       });
       res.json(courses);
   };
   dbConnector(fetchCoursesByStudentID);
});

router.get('/courses/student/:studentID/semester/:semester', function(req, res){
    var fetchCoursesByStudentIDAndSemester = function(db, callback){
        var stdId = req.params.studentID;
        var semester = req.params.semester;
        var queryJSON = {};

        if (stdId != -1)
            queryJSON['students.StudentID'] = parseInt(stdId);

        if (semester != -1)
            queryJSON['semester'] = semester;

        console.log(queryJSON);
        var dbCursor = db.collection('course').find(queryJSON);
        var courses = [];

        dbCursor.each(function(err, doc){
            assert(err, null);
            if (doc != null)
                courses.push(doc);
        });
        res.json(courses);
    };
    dbConnector(fetchCoursesByStudentIDAndSemester);
});

module.exports = router;