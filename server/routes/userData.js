const express = require('express');
const router = express.Router();
// models
const User = require('../models/user');
const UserData = require('../models/userData');

const seed = [{
        "gender": "female",
        "locale": "en_US",
        "avatar": "https://n4.sdlcdn.com/imgs/f/s/e/26May_CottonSilk_4H-b5152.jpg",
        "status": true,
        "timezone": "GMT+6.5",
        "lat": "40.730610",
        "long": "-73.935242"
    },
    {
        "gender": "male",
        "locale": "en_US",
        "avatar": "https://n4.sdlcdn.com/imgs/f/s/e/26May_CottonSilk_4H-b5152.jpg",
        "status": false,
        "timezone": "GMT+5.5",
        "lat": "‎-33.918861",
        "long": "18.423300	"
    },
    {
        "gender": "female",
        "locale": "en_US",
        "avatar": "https://n4.sdlcdn.com/imgs/f/s/e/26May_CottonSilk_4H-b5152.jpg",
        "status": true,
        "timezone": "GMT+4.5",
        "lat": "28.475760",
        "long": "77.093081"
    },
    {
        "gender": "female",
        "locale": "en_US",
        "avatar": "https://n4.sdlcdn.com/imgs/f/s/e/26May_CottonSilk_4H-b5152.jpg",
        "status": true,
        "timezone": "GMT+5.5",
        "lat": "-0.777259",
        "long": "-91.142578	"
    }
]

// dummy seed 
// dummy profile check
router.get('/', (req, res, next) => {
    seed.forEach(element => {
        var seedObj = new UserData({
            gender: element.gender,
            locale: element.locale,
            avatar: element.avatar,
            status: element.status,
            timezone: element.timezone,
            lat: element.lat,
            long: element.long
        }); // seed obj 

        bulk.insert(seedObj)

            .insert(array[i])

        /*seedObj.save((err) => {
            //check for error
            if (err) {
                // Show failed if all else fails for some reasons
                res.status(400).json({
                    success: false,
                    msg: 'Failed to Seed.'
                });
                next(err);

            } // err

            // if no errors save the user 
            else {
                res.json({
                    success: true,
                    msg: 'User Data sucessfully seeded.'
                });
                next();
            }
        }); // save*/

    });

    bulk.execute();
});


module.exports = router;
