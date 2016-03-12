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
            cour['groupId'] = course_lecturer_mapping[course]['GroupId [Number]'];
            cour['deptNo'] = course_lecturer_mapping[course]['Department No [INT]'];
            cour['exams'] = [
                {
                    "type" : "پایان ترم",
                    "datetime" : course_lecturer_mapping[course]['Final Exam Time [DateTime]'],
                    "title": "پایان ترم"
                }
            ];
            var CLID = course_lecturer_mapping[course]['CLID [Number]'];
            var course_lecturer_code = course_lecturer_mapping[course]['Lecturer Code [INT]'];
            //console.log(course_lecturer_code);

            for (l in lecturers) {
                if (lecturers[l]['Lecturer Code [INT]'] == course_lecturer_code){
                    var lecturer_dict = {};
                    var user_dict = {};
                    user_dict['name'] = lecturers[l]['Name [String]'];
                    user_dict['imageUrl'] = '/src/app/components/assets/images/avatar-1-big.jpg';
                    user_dict['email'] = 'template@template.com';
                    user_dict['password'] = lecturers[l]['Plain Password [String]'];
                    user_dict['birthday'] = lecturers[l]['Birth Date [Date]'];
                    lecturer_dict['deptNo'] = lecturers[l]['Department No [INT]'];
                    lecturer_dict['LecturerID'] = lecturers[l]['Lecturer Code [INT]'];
                    lecturer_dict['user'] = user_dict;
                    cour['professor'] = lecturer_dict;
                }
            }
            cour['students'] = [];

            for (s in enrolled_students){
                if (enrolled_students[s]['CLID [Number]'] == CLID){
                    var std_id = enrolled_students[s]['StudentId [Number]'];
                    for (std in students){
                        if (students[std]['Student No. [Number]'] == std_id){
                            var student_desc = {};
                            var user_dict = {};
                            user_dict['name'] = students[std]['Name [String]'];
                            user_dict['password'] = students[std]['Plain Password [String]'];
                            user_dict['birthday'] = students[std]['Birth Date [Date]'];
                            user_dict['imgUrl'] = "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg";
                            student_desc['deptNo'] = students[std]['Department No [INT]'];
                            student_desc['StudentID'] = students[std]['student No. [INT]'];
                            student_desc['user'] = user_dict;
                            console.log(student_desc);
                            cour['students'].push(student_desc);
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
