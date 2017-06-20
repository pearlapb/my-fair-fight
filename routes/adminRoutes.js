var express = require('express'), router = express.Router();
const db = require('../config/dbAdmin.js');

router.route('/getAllProjects')

    .get( (req, res) => {
        db.getAllProjects().then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/saveNewProject')

    .post( (req, res) => {
        db.saveNewProject(req.body).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });

router.route('/closeOngoingProject')

    .post( (req, res) => {
        db.closeOngoingProject(Number(req.body.projectId)).then((result) => {
            res.json({ result: result.rows });
        }).catch((err) => {
            console.log(err);
            res.json({ error: true });
        });
    });


module.exports = router;
