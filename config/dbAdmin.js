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

const getAllUsers = () => {
    return new Promise(function(resolve, reject) {
        let q = `SELECT id, user_type, first_name, last_name, age, country, city, school, teacher, profile_pic_url, created_at
                    FROM users;`;
        db.query(q, []).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const disactivateUser = (idToDisactivate) => {
    return new Promise(function(resolve, reject) {
        let q = `UPDATE users
                    SET account_status = 'disactivated'
                    WHERE id = $1;`;
        let params = [idToDisactivate];
        db.query(q, params).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

const deleteUserFromDb = (idToDelete) => {
    return new Promise(function(resolve, reject) {
        let q = `DELETE FROM users
                    WHERE id = $1;`;
        let params = [idToDelete];
        db.query(q, params).then((result) => {
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
        let params = [projectInfo.country.toLowerCase(), projectInfo.city.toLowerCase(), projectInfo.school.toLowerCase(), projectInfo.teacher.toLowerCase(), 'ongoing'];
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
module.exports.getAllUsers = getAllUsers;
module.exports.deleteUserFromDb = deleteUserFromDb;
module.exports.disactivateUser = disactivateUser;
