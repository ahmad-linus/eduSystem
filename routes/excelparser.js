/**
 * Created by linus on 3/10/2016 AD.
 */
var request = require('request');
var HttpOK = 200;
var fs = require('fs');
var express = require('express');
var router = express.Router();
var xlsx = require('xlsx');

router.get('/', function(req, res, next){

    var stream = request('http://localhost:3000/edu', function(err, response, body){
        if (!err && response.statusCode == HttpOK) {
        }
    }).pipe(fs.createWriteStream('semester-info.xlsx'));

    stream.on('finish', function(){
        var workbook = xlsx.readFile('semester-info.xlsx');
        var sheets = workbook.SheetNames;

        sheets.forEach(function(sheet_name){
            var worksheet = workbook.Sheets[sheet_name];
            if (sheet_name === "Students" ){
                var cells_list = ['A', 'B', 'C', 'D', 'E'];
                var counter = 0;
                var student_list = [];
                for (w in worksheet){
                    var students = [];
                    if (row === '!')
                        continue;
                    if (counter >= 1){
                        students.push(worksheet[w].v);
                    }
                    counter++;
                }
            }

            if (sheet_name === "Lecturers"){
                console.log(sheet_name);
            }

            if (sheet_name === "Course-Lecturer Mapping"){
                console.log(sheet_name);
            }

            if (sheet_name === "Student-Course Mapping"){
                console.log(sheet_name);
            }

        });
    });
    res.send("hi");
});

module.exports = router;
