var express = require('express'), router = express.Router();
const db = require('../config/db.js');

router.route('/getAllAchievements')

    .get( (req, res) => {
        db.getAllAchievements(req.session.user.userId).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/giveAchievementToStudents')

    .post( (req, res) => {
        console.log(req.body);
        db.giveAchievementToStudents(req.body.selectedStudents, req.body.achievementType, req.body.achievementName, req.session.user.userId).then((result) => {
            console.log(result);
            res.json({ result: result });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

module.exports = router;
