var express = require('express'), router = express.Router();
const db = require('../config/dbUser.js');


router.route('/userProfileInfo')

    .get( (req, res) => {
        let requestedId = req.session.user.userId;
        db.getUserProfileInfo(requestedId).then(function(userInfo) {
            if (!userInfo.rows[0]) {
                res.json({
                    noUser: true
                });
                return;
            } else {
                console.log(userInfo.rows[0]);
                let userProfileInfo = {
                    userId: userInfo.rows[0].id,
                    userType: userInfo.rows[0].user_type,
                    userName: userInfo.rows[0].user_name,
                    firstName: userInfo.rows[0].first_name,
                    lastName: userInfo.rows[0].last_name,
                    age: userInfo.rows[0].age,
                    country: userInfo.rows[0].country,
                    city: userInfo.rows[0].city,
                    school: userInfo.rows[0].school,
                    profilePicUrl: userInfo.rows[0].profile_pic_url,
                    profileColor: userInfo.rows[0].profile_color,
                };
                res.json({
                    success: true,
                    result: userProfileInfo
                });
            }
        }).catch(function(err) {
            res.json({
                error: true
            });
            console.log(err);
        });
    });

router.route('/getCountryOfUser')

    .get( (req, res) => {
        db.getCountryOfUser(req.session.user.userId).then((result) => {
            res.json({ country: result.rows[0].country });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/getAllStudentsFromCountry')

    .get( (req, res) => {
        db.getAllStudentsFromCountry(req.query.country).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/getAllAchievements')

    .get( (req, res) => {
        db.getAllAchievements(req.session.user.userId).then((result) => {
            result.rows.forEach((ach) => {
                ach.display_date = new Date(+ach.created_at).toLocaleString();
            })
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/giveAchievementToStudents')

    .post( (req, res) => {
        db.giveAchievementToStudents(req.body.selectedStudents, req.body.achievementType, req.body.achievementName, req.session.user.userId).then((result) => {
            res.json({ result: result });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/getAllStudentFeed')

    .get( (req, res) => {
        db.getAllStudentFeed(req.session.user.userId).then((result) => {
            result.rows.forEach((post) => {
                post.display_date = new Date(+post.created_at).toLocaleString();
            })
            console.log(result.rows);
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });


router.route('/editProfileBackgroundColor')

    .post( (req, res) => {
        db.editProfileBackgroundColor(req.body.newColor, req.session.user.userId).then((result) => {
            res.json({ color: result.rows[0].profile_color });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });


module.exports = router;
