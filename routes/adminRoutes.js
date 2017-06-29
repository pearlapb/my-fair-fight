var express = require('express'), router = express.Router();
const db = require('../database/dbAdmin.js');

router.route('/getAllProjects')

    .get( (req, res) => {
        db.getAllProjects().then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/getAllUsers')

    .get( (req, res) => {
        db.getAllUsers().then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/getAllAdminActivity')

    .get( (req, res) => {
        db.getAllAdminActivity().then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });


router.route('/getMyAdminActivity')

    .get( (req, res) => {
        db.getMyAdminActivity(req.session.user.userId).then((result) => {
            res.json({ result: result })
        }).catch((err) => {
            console.log(err);
            res.json({ error: true })
        })
    })

router.route('/disactivateUser')

    .post( (req, res) => {
        db.disactivateUser(req.body.idToDisactivate, req.session.user.userId).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/deleteUserFromDb')

    .post( (req, res) => {
        db.deleteUserFromDb(req.body.idToDelete, req.session.user.userId).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/saveNewProject')

    .post( (req, res) => {
        db.saveNewProject(req.body, req.session.user.userId).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/closeOngoingProject')

    .post( (req, res) => {
        db.closeOngoingProject(Number(req.body.projectId), req.session.user.userId).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });


module.exports = router;
