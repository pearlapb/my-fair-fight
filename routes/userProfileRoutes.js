var express = require('express'), router = express.Router();
const db = require('../config/db.js');


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
                let userProfileInfo = {
                    userId: userInfo.rows[0].id,
                    userType: userInfo.rows[0].user_type,
                    userName: userInfo.rows[0].user_name,
                    firstName: userInfo.rows[0].first_name,
                    lastName: userInfo.rows[0].last_name,
                    profilePicUrl: userInfo.rows[0].profile_pic_url,
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


module.exports = router;
