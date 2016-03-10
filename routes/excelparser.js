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

        sheets.forEach(function(y){
            var worksheet = workbook.Sheets[y];
            if (y === "Students" ){
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
                console.log(data);
            }

            if (y === "Lecturers"){
                //console.log(sheet_name);
            }

            if (y === "Course-Lecturer Mapping"){
                //console.log(sheet_name);
            }

            if (y === "Student-Course Mapping"){
                //console.log(sheet_name);
            }

        });
    });
    res.send("hi");
});

module.exports = router;
