var express = require('express');
var router = express.Router();

router.get('/test', function (req, res, next) {
    var comments =
    {
        "rate": 3,
        "content": "این بهترین سامانه مدیریت آموزشی هست که تا الان توسعه داده شده :)",
        "recordDatetime": "Sun Mar 06 2016 17:02:03 GMT+0330 (Iran Standard Time)",
        "creator": {
            "name": "ابوذر کمائی",
            "birthday": "Sun Mar 06 2015 17:02:03 GMT+0330 (Iran Standard Time)",
            "email": "AbouzarKamaee@gmail.com",
            "password": "fuckingweakstupidpassword",
            "imageUrl": "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg"
        },
        "rateAndCommentable": {
            "rateAndCommentableId": "1234567890"
        }
    };
    return res.json(comments);
});

router.get('/test2', function (req, res, next) {
    var comments = [
        {
            "rate": 2,
            "content": "نظر دومی هست که در سامانه ثبت می گردد.",
            "recordDatetime": "Sun Mar 06 2016 17:02:03 GMT+0330 (Iran Standard Time)",
            "creator": {
                "name": "احمد احمدیان",
                "birthday": "Sun Mar 06 2015 17:02:03 GMT+0330 (Iran Standard Time)",
                "email": "a.ahmadian@gmail.com",
                "imageUrl": "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg"
            },
            "rateAndCommentable": {
                "rateAndCommentableId": "1234567890"
            }
        },
        {
            "rate": 5,
            "content": "این بهترین سامانه مدیریت آموزشی هست که تا الان توسعه داده شده :)",
            "recordDatetime": "Sun Mar 06 2016 17:02:03 GMT+0330 (Iran Standard Time)",
            "creator": {
                "name": "ابوذر کمائی",
                "birthday": "Sun Mar 06 2015 17:02:03 GMT+0330 (Iran Standard Time)",
                "email": "AbouzarKamaee@gmail.com",
                "imageUrl": "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg"
            },
            "rateAndCommentable": {
                "rateAndCommentableId": "1234567890"
            }
        }
    ];
    return res.json(comments);
});

module.exports = router;