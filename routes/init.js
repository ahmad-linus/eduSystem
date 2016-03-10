var express = require('express');
var router = express.Router();

router.get('/edu/excel', function (req, res, next) {
    console.log('Service ')
    var course = [
        {
            "id": "2310283013810238",
            "title": "طراحی سیستم های شئ گرا",
            "campus": "مهندسی کامپیوتر",
            "code": "۴۰۴۸۴",
            "professor": {
                "user": {
                    "name": "سبحان فروغی",
                    "imageUrl": "/src/app/components/assets/images/avatar-1-big.jpg",
                    "email": "sobhanforoughi@gmail.com",
                    "password": "lksdjlsjf",
                    "birthday": new Date(1224043200000)
                }
            },
            "chief": {
                "user": {
                    "name": "مجتبی ورمزیار",
                    "email": "mahmoud1468@gmail.com",
                    "imageUrl": "/src/app/components/assets/images/avatar-1-big.jpg",
                    "password": "lsjflaskjflasjf",
                    "birthday": new Date(1224043200000),
                }
            },
            "assistants": [
                {
                    "user": {
                        "name": "Mohammad Asghari",
                        "email": "mhm.asghari@gmail.com",
                        "imageUrl": "/src/app/components/assets/images/avatar-1-big.jpg",
                        "password": "lkjlkdjfadf",
                        "birthday": new Date(1224043200000),
                    }
                }
            ],
            "semester": "۹۵-۹۴",
            "time": "شنبه ها و دوشنبه ها ساعت ۷:۳۰ تا ۹:۰۰",
            "class": "دانشکده کامپیوتر ۷۲۴",
            "students": [
                {
                    "user": {
                        "name": "ابوذر کمائی",
                        "birthday": "Sun Mar 06 2015 17:02:03 GMT+0330 (Iran Standard Time)",
                        "email": "AbouzarKamaee@gmail.com",
                        "password": "fuckingweakstupidpassword",
                        "imageUrl": "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg"
                    }
                },
                {
                    "user": {
                        "name": "احمد احمدیان",
                        "birthday": "Sun Mar 06 2015 17:02:03 GMT+0330 (Iran Standard Time)",
                        "email": "a.ahmadian@gmail.com",
                        "imageUrl": "http://www.keita-gaming.com/assets/profile/default-avatar-c5d8ec086224cb6fc4e395f4ba3018c2.jpg"
                    }
                }
            ]
        }
    ];
    res.json(course);
});

module.exports = router;