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
        var exceldict = {};
        var courses = [];

        sheets.forEach(function(y){
            var worksheet = workbook.Sheets[y];
            var worksheet = workbook.Sheets[y];
            var headers = {};
            var data = [];
            for(z in worksheet) {
                if(z[0] === '!') continue;
                    //parse out the column, row, and value
                    var col = z.substring(0,1);
                    var row = parseInt(z.substring(1));
                    var value = worksheet[z].v;

                    //store header names
                    if(row == 1) {
                        headers[col] = value;
                        continue;
                    }

                    if(!data[row]) data[row]={};
                    data[row][headers[col]] = value;
                }
                //drop those first two rows which are empty
                data.shift();
                data.shift();
                exceldict[y] = data;
        });

        var course_lecturer_mapping = exceldict['Course-Lecturer Mapping'];
        var lecturers = exceldict['Lecturers'];
        var students = exceldict['Students'];
        var enrolled_students = exceldict['Student-Course Mapping'];


        for (course in course_lecturer_mapping){
            var singleCourse = {};
            singleCourse['id'] = "1234";
            singleCourse['title'] = course['Course Title [String]'];
            singleCourse['code'] = course['Course No [Number]'];
            singleCourse['class'] = course['Room [String]'];
            singleCourse['semester'] = course['Semester [String]'];
            singleCourse['time'] = course['Time [String]'];
            var CLID = course['CLID [Number]'];
            var course_lecturer_code = course['Lecturer Code [INT]'];


            for (l in lecturers) {
                if (l['Lecturer Code [INT]'] == course_lecturer_code){
                    var lecturer_dict = {};
                    lecturer_dict['name'] = l['Name [String]'];
                    lecturer_dict['imageUrl'] = '/src/app/components/assets/images/avatar-1-big.jpg';
                    lecturer_dict['email'] = 'template@template.com';
                    lecturer_dict['password'] = l['Plain Password [String]'];
                    lecturer_dict['birthday'] = l['Birth Date [Date]'];
                    singleCourse['professor']['user'] = lecturer_dict;
                }
            }
            singleCourse['students'] = [];

            for (s in enrolled_students){
                if (s['CLID [Number]'] == CLID){
                    var std_id = s['StudentId [Number]'];
                    for (std in students){
                        if (std['Student No. [Number]'] == std_id){
                            var student_desc = {};
                            student_desc['name'] = std['Name [String]'];
                            student_desc['password'] = std['Plain Password [String]'];
                            student_desc['birthday'] = std['Birth Date [Date]'];
                            student_desc['imgUrl'] = "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg";
                            singleCourse['students'].push({'user' : student_desc});
                        }
                    }
                }
            }

        }
    });
    res.send("hi");
});

module.exports = router;
