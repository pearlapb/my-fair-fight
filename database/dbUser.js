var spicedPg = require('spiced-pg');
let dbUrl;
if (!process.env.DATABASE_URL) {
    dbUrl = require('../config/secrets.json').dbUrl;
} else {
    dbUrl = process.env.DATABASE_URL;
}
var db = spicedPg(dbUrl);

const getUserProfileInfo = (requestedId) => {
    return new Promise(function(resolve, reject) {
        const q = 'SELECT id, user_type, user_name, first_name, last_name, age, country, city, school, profile_pic_url, profile_color FROM users WHERE id = $1;';
        const params = [requestedId];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const saveImageS3UrlToDb = (file, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE users SET profile_pic_url = $1 WHERE id = $2 RETURNING profile_pic_url;';
        const params = [`https://s3.amazonaws.com/myfairfight2/${file}`, session];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
}

const saveImageUrlToDb = (file, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE users SET profile_pic_url = $1 WHERE id = $2 RETURNING profile_pic_url;';
        const params = [`/uploads/${file}`, session];
        db.query(q, params).then(function(result) {
            resolve(result);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const getAllAchievements = (requestedId) => {
    return new Promise(function(resolve, reject) {
        const q = `SELECT * FROM achievements WHERE student_id = $1`;
        const params = [requestedId];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getAllStudentFeed = (requestedId) => {
    return new Promise(function(resolve, reject) {
        const q = `SELECT * FROM student_feed WHERE student_id = $1`;
        const params = [requestedId];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
}

const getCountryOfUser = (requestedId) => {
    return new Promise(function(resolve, reject) {
        const q = `SELECT country
                    FROM users
                    WHERE id = $1`;
        const params = [requestedId];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const getAllStudentsFromCountry = (country) => {
    return new Promise(function(resolve, reject) {
        const q = `SELECT *
                    FROM users
                    WHERE country = $1
                    AND user_type = 'student'`;
        const params = [country];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const giveAchievementToStudents = (selectedStudents, achievementType, achievementName, senderId) => {
    return new Promise(function(resolve, reject) {
        let counter = 0, achievementsSent = [];
        for (var i = 0; i < selectedStudents.length; i++) {
            insertOneAchievement(selectedStudents[i], achievementType, achievementName, senderId).then((result) => {
                counter++;
                achievementsSent.push(result);
                if (counter == selectedStudents.length) {
                    resolve(achievementsSent);
                }
            }).catch((err) => {
                reject(err);
            });
        }
    });
};

const insertOneAchievement = (requestedId, achievementType, achievementName, senderId) => {
    return new Promise(function(resolve, reject) {
        const q = `INSERT INTO achievements (student_id, achievement_type, achievement_name, sender_id, created_at)
                    VALUES ($1, $2, $3, $4, $5);`;
        const params = [requestedId, achievementType, achievementName, senderId, Date.now()];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const savePostWithS3ImageToDb = (requestedId, message, photo) => {
    return new Promise(function(resolve, reject) {
        const q = `INSERT INTO student_feed (student_id, message, photo, created_at)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *;`;
        const params = [requestedId, message, `https://s3.amazonaws.com/myfairfight2/${photo}`, Number(Date.now())];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const savePostWithImageToDb = (requestedId, message, photo) => {
    return new Promise(function(resolve, reject) {
        const q = `INSERT INTO student_feed (student_id, message, photo, created_at)
                    VALUES ($1, $2, $3, $4)
                    RETURNING *;`;
        const params = [requestedId, message, `/uploads/${photo}`, Number(Date.now())];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const saveSimplePostToDb = (requestedId, message) => {
    console.log(Number(Date.now()));
    return new Promise(function(resolve, reject) {
        const q = `INSERT INTO student_feed (student_id, message, created_at)
                    VALUES ($1, $2, $3)
                    RETURNING *;`;
        const params = [requestedId, message, Number(Date.now())];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

const editProfileBackgroundColor = (newBackground, profileId) => {
    return new Promise((resolve, reject) => {
        const q = `UPDATE users
                    SET profile_color = $1
                    WHERE id = $2
                    RETURNING profile_color;`;
        const params = [newBackground, profileId];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports.getUserProfileInfo = getUserProfileInfo;
module.exports.saveImageUrlToDb = saveImageUrlToDb;
module.exports.saveImageS3UrlToDb = saveImageS3UrlToDb;
module.exports.getAllAchievements = getAllAchievements;
module.exports.getAllStudentFeed = getAllStudentFeed;
module.exports.getCountryOfUser = getCountryOfUser;
module.exports.getAllStudentsFromCountry = getAllStudentsFromCountry;
module.exports.giveAchievementToStudents = giveAchievementToStudents;
module.exports.insertOneAchievement = insertOneAchievement;
module.exports.savePostWithImageToDb = savePostWithImageToDb;
module.exports.savePostWithS3ImageToDb = savePostWithS3ImageToDb;
module.exports.saveSimplePostToDb = saveSimplePostToDb;
module.exports.editProfileBackgroundColor = editProfileBackgroundColor;
