var spicedPg = require('spiced-pg');
var db = spicedPg("postgres:funkyChicken:letmein@localhost:5432/myfairfight");

const getAllProjects = () => {
    return new Promise(function(resolve, reject) {
        let q = `SELECT * FROM projects;`;
        db.query(q, []).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const saveNewProject = (projectInfo) => {
    return new Promise(function(resolve, reject) {
        let q = `INSERT INTO projects (country, city, school, teacher, status)
                    VALUES  ($1, $2, $3, $4, $5);`;
        let params = [projectInfo.country, projectInfo.city, projectInfo.school, projectInfo.teacher, 'ongoing'];
        db.query(q, params).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const closeOngoingProject = (projectId) => {
    return new Promise(function(resolve, reject) {
        let q = `UPDATE projects
                    SET status = 'closed'
                    WHERE id = $1;`;
        let params = [projectId];
        db.query(q, params).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getAllProjects = getAllProjects;
module.exports.saveNewProject = saveNewProject;
module.exports.closeOngoingProject = closeOngoingProject;
