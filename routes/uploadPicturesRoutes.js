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

router.route('/uploadImageForFeed')

    .post( uploader.single('file'), (req, res) => {
        console.log('messageee', req.body.message);
        if (req.file) {
            db.savePostWithImageToDb(req.session.user.userId, req.body.message, req.file.filename).then(function(result) {
                res.json({
                    success: true,
                    post: result
                });
            }).catch(function(err) {
                console.log(err);
            });
        } else {
            res.json({ error: true });
        }
    });

router.route('/sendNewPostForFeed')

    .post( (req, res) => {
        console.log('hey --> ', req.body.message);
        db.saveSimplePostToDb(req.session.user.userId, req.body.message).then(function(result) {
            res.json({
                success: true,
                post: result
            });
        }).catch(function(err) {
            console.log(err);
        });
    });

module.exports = router;
