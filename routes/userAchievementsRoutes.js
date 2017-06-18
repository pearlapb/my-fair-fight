var express = require('express'), router = express.Router();
const db = require('../config/db.js');

router.route('/getAllAchievements')

    .get( (req, res) => {
        db.getAllAchievements(req.session.user.userId).then((result) => {
            console.log(result.rows);
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

module.exports = router;
