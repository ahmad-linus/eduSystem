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

        sheets.forEach(function(y){
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
        var courses = [];

        for (course in course_lecturer_mapping){
            var cour = {};
            console.log(course);
            cour['id'] = "1234";
            cour['title'] = course_lecturer_mapping[course]['Course Title [String]'];
            cour['code'] = course_lecturer_mapping[course]['Course No [Number]'];
            cour['class'] = course_lecturer_mapping[course]['Room [String]'];
            cour['semester'] = course_lecturer_mapping[course]['Semester [String]'];
            cour['time'] = course_lecturer_mapping[course]['Time [String]'];
            cour['finalExamtime'] = course_lecturer_mapping[course]['Final Exam Time [DateTime]'];
            cour['groupId'] = course_lecturer_mapping[course]['GroupId [Number]'];
            cour['deptNo'] = course_lecturer_mapping[course]['Department No [INT]'];


            var CLID = course_lecturer_mapping[course]['CLID [Number]'];
            var course_lecturer_code = course_lecturer_mapping[course]['Lecturer Code [INT]'];
            //console.log(course_lecturer_code);

            for (l in lecturers) {
                if (lecturers[l]['Lecturer Code [INT]'] == course_lecturer_code){
                    var lecturer_dict = {};
                    lecturer_dict['name'] = lecturers[l]['Name [String]'];
                    lecturer_dict['imageUrl'] = '/src/app/components/assets/images/avatar-1-big.jpg';
                    lecturer_dict['email'] = 'template@template.com';
                    lecturer_dict['password'] = lecturers[l]['Plain Password [String]'];
                    lecturer_dict['birthday'] = lecturers[l]['Birth Date [Date]'];
                    lecturer_dict['deptNo'] = lecturers[l]['Department No [INT]'];
                    lecturer_dict['ID'] = lecturers[l]['Lecturer Code [INT'];
                    cour['professor'] = {"user" : lecturer_dict};
                }
            }
            cour['students'] = [];

            for (s in enrolled_students){
                if (enrolled_students[s]['CLID [Number]'] == CLID){
                    var std_id = enrolled_students[s]['StudentId [Number]'];
                    for (std in students){
                        if (students[std]['Student No. [Number]'] == std_id){
                            var student_desc = {};
                            student_desc['name'] = students[std]['Name [String]'];
                            student_desc['password'] = students[std]['Plain Password [String]'];
                            student_desc['birthday'] = students[std]['Birth Date [Date]'];
                            student_desc['imgUrl'] = "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg";
                            student_desc['deptNo'] = students[std]['Department No [INT]'];
                            student_desc['ID'] = students[std]['student No. [INT]'];
                            var student_user = {"user" : student_desc};
                            console.log(student_user);
                            cour['students'].push(student_user);
                        }
                    }
                }
            }
            //console.log(cour);
            courses.push(cour);
        }
        res.json(courses);
    });

});

module.exports = router;
