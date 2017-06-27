var spicedPg = require('spiced-pg');
var dbUrl = process.env.DATABASE_URL || "postgres:funkyChicken:letmein@localhost:5432/myfairfight";
var db = spicedPg(dbUrl);

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

const getAllAdminActivity = () => {
    return new Promise(function(resolve, reject) {
        let q = `SELECT *
                    FROM admin_activity;`;
        db.query(q, []).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    })
}

const getMyAdminActivity = (userId) => {
    return new Promise(function(resolve, reject) {
        let q = `SELECT *
                    FROM admin_activity
                    WHERE admin_id = $1;`;
        db.query(q, [userId]).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
}

const disactivateUser = (idToDisactivate, adminId) => {
    return new Promise(function(resolve, reject) {
        let q = `UPDATE users
                    SET account_status = 'disactivated'
                    WHERE id = $1
                    RETURNING *;`;
        let params = [idToDisactivate];
        db.query(q, params).then((result) => {
            let q2 = `INSERT INTO admin_activity (admin_id, activity_type, comments)
                        VALUES ($1, $2, $3);`;
            let comment = `Deactivated ${result.rows.first_name} ${result.rows.last_name}'s ${result.rows.user_type} account.`;
            let params2 = [adminId, 'profile-disactivation', comment];
            db.query(q2, params2).then((res2) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        });
    });
};

const deleteUserFromDb = (idToDelete, adminId) => {
    return new Promise(function(resolve, reject) {
        let q = `DELETE FROM users
                    WHERE id = $1
                    RETURNING *;`;
        let params = [idToDelete];
        db.query(q, params).then((result) => {
            let q2 = `INSERT INTO admin_activity (admin_id, activity_type, comments)
                        VALUES ($1, $2, $3);`;
            let comment = `Deleted ${result.rows[0].first_name} ${result.rows[0].last_name}'s ${result.rows[0].user_type} account.`;
            let params2 = [adminId, 'profile-deletion', comment];
            db.query(q2, params2).then((res2) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        });
    });
};

const saveNewProject = (projectInfo, adminId) => {
    return new Promise(function(resolve, reject) {
        let q = `INSERT INTO projects (country, city, school, teacher, status)
                    VALUES  ($1, $2, $3, $4, $5)
                    RETURNING *;`;
        let params = [projectInfo.country.toLowerCase(), projectInfo.city.toLowerCase(), projectInfo.school.toLowerCase(), projectInfo.teacher.toLowerCase(), 'ongoing'];
        db.query(q, params).then((result) => {
            let q2 = `INSERT INTO admin_activity (admin_id, activity_type, comments)
                        VALUES ($1, $2, $3);`;
            let comment = `Added new project in country: ${result.rows[0].country}, city: ${result.rows[0].city}, school: ${result.rows[0].school} and teacher: ${result.rows[0].teacher}.`;
            let params2 = [adminId, 'project-addition', comment];
            db.query(q2, params2).then((res2) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        });
    });
};

const closeOngoingProject = (projectId, adminId) => {
    return new Promise(function(resolve, reject) {
        let q = `UPDATE projects
                    SET status = 'closed'
                    WHERE id = $1
                    RETURNING *;`;
        let params = [projectId];
        db.query(q, params).then((result) => {
            let q2 = `INSERT INTO admin_activity (admin_id, activity_type, comments)
                        VALUES ($1, $2, $3);`;
            let comment = `Closed an ongoing project in country: ${result.rows[0].country}, city: ${result.rows[0].city}, school: ${result.rows[0].school} and teacher: ${result.rows[0].teacher}.`;
            let params2 = [adminId, 'project-deletion', comment];
            db.query(q2, params2).then((res2) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getAllProjects = getAllProjects;
module.exports.saveNewProject = saveNewProject;
module.exports.getMyAdminActivity = getMyAdminActivity;
module.exports.closeOngoingProject = closeOngoingProject;
module.exports.getAllUsers = getAllUsers;
module.exports.getAllAdminActivity = getAllAdminActivity;
module.exports.deleteUserFromDb = deleteUserFromDb;
module.exports.disactivateUser = disactivateUser;
