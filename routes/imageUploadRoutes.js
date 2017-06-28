var express = require('express'), router = express.Router();
const db = require('../config/dbUser.js');
const path = require('path');
const aws = require('aws-sdk');
const http = require('http');
const fs = require('fs');
const secrets = require('../config/secrets.json');
const s3Secrets = require('../config/secrets.json');
const multer = require('multer');

var diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, path.resolve(__dirname, '../uploads'));
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

var config_path = path.join(path.resolve(__dirname, '../config/s3Secrets.json'));
aws.config.loadFromPath(config_path);
var s3 = new aws.S3();

router.route('/buckets')

    .get((req, res) => {
        s3.listBuckets((err, data) => {
            res.json({data});
        })
    });

router.route('/listBucketContent')

    .get((req, res) => {
        s3.listObjects({Bucket: 'myfairfight'}, (err, data) => {
            res.json({ list: data })
        })
    })

router.route('/getS3File')

    .get((req, res) => {
        console.log(req.query, req.params)
        var options = {
            Bucket: 'myfairfight',
            Key: '1498658016209_39605617_oneyear.jpg'
        }
        s3.getObject(options, (err, data) => {
            if (err) {
                console.log(err);
                res.json({ error: true });
            } else {
                console.log('data:', data);
                res.end(data.Body);
            }
        })
    })

router.route('/uploadProfilePicture')

    .post( uploader.single('file'), (req, res) => {
        if (req.file) {
            console.log(req.file);
            var s3Request = {
                Body: fs.readFileSync(req.file.path),
                Bucket: "myfairfight",
                Key: req.file.filename
            }
            s3.putObject(s3Request, (err, data) => {
                if (err) {
                    console.log("there was an error with s3 --> ", err);
                    res.json({ error: true })
                } else {
                    console.log("s3 upload worked --> ", data);
                    db.saveS3ImageUrlToDb(req.file, req.session.user).then(function(result) {
                        res.json({
                            success: true,
                            file: result,
                            s3file: data
                        });
                    }).catch(function(err) {
                        console.log(err);
                    });
                    /*db.saveImageUrlToDb(req.file, req.session.user).then(function(result) {
                        res.json({
                            success: true,
                            file: result,
                            s3file: data
                        });
                    }).catch(function(err) {
                        console.log(err);
                    });*/
                }
            })
        } else {
            res.json({ error: true });
        }
    });

router.route('/uploadImageForFeed')

    .post( uploader.single('file'), (req, res) => {
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
