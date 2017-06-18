var express = require('express'), router = express.Router();
const db = require('../config/db.js');
const path = require('path');

const multer = require('multer');

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.resolve(__dirname, '../uploads')); // use path.resolve so that multer can read the url
    },
    filename: function(req, file, callback) {
        callback(null, Date.now() + '_' + Math.floor(Math.random() * 99999999) + '_' + file.originalname);
    }
});

var uploader = multer({
    storage: diskStorage,
    limits: {
        filesize: 2097152
    }
});

router.route('/uploadProfilePicture')

    .post( uploader.single('file'), (req, res) => {
        if (req.file) {
            db.saveImageUrlToDb(req.file, req.session.user).then(function(result) {
                res.json({
                    success: true,
                    file: result
                });
            }).catch(function(err) {
                console.log(err);
            });
        } else {
            res.json({ error: true });
        }
    });


module.exports = router;
