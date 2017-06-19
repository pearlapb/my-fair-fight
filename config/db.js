var spicedPg = require('spiced-pg');
var db = spicedPg("postgres:funkyChicken:letmein@localhost:5432/myfairfight");
const chalk = require('chalk');

const checkIfUserExists = (userInfo) => {
    return new Promise(function(resolve, reject) {
        const q = `SELECT *
                    FROM users
                    WHERE user_name = $1;`;
        const params = [userInfo.userName];
        db.query(q, params).then(function(results) {
            resolve(results);
        }).catch(function(err) {
            reject(err);
        });
    });
};

const addNewUserToDb = (newUserInfo) => {
    return new Promise(function(resolve, reject) {
        let q = '', params = [];
        // IF NEW USER IS A STUDENT
        if (newUserInfo.userType == 'student') {
            console.log(chalk.bgGreen('im a student'));
            q = `INSERT INTO users (user_type, first_name, last_name, user_name, hashed_pw, age, country, city, school, profile_pic_url, profile_color)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
                        RETURNING *;`;
            params = [
                newUserInfo.userType,
                newUserInfo.firstName,
                newUserInfo.lastName,
                newUserInfo.userName,
                newUserInfo.hashedPw,
                newUserInfo.age,
                newUserInfo.country,
                newUserInfo.city,
                newUserInfo.school,
                '/public/assets/unknown.png',
                'new-blue'
            ];
        // IF NEW USER IS A TEACHER (add coutry later on!)
        } else if (newUserInfo.userType == 'teacher') {
            console.log(chalk.bgGreen('im a teacher'));
            q = `INSERT INTO users (user_type, first_name, last_name, user_name, hashed_pw, profile_pic_url)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING *;`;
            params = [
                newUserInfo.userType,
                newUserInfo.firstName,
                newUserInfo.lastName,
                newUserInfo.userName,
                newUserInfo.hashedPw,
                '/public/assets/unknown.png'
            ];
        // IF NEW USER IS A FF MEMBER
        } else if (newUserInfo.userType == 'FFmember') {
            console.log(chalk.bgGreen('im a memeber'));
            q = `INSERT INTO users (user_type, first_name, last_name, user_name, hashed_pw, profile_pic_url)
                        VALUES ($1, $2, $3, $4, $5, $6)
                        RETURNING *;`;
            params = [
                newUserInfo.userType,
                newUserInfo.firstName,
                newUserInfo.lastName,
                newUserInfo.userName,
                newUserInfo.hashedPw,
                '/public/assets/unknown.png'
            ];
        }
        db.query(q, params).then(function(results) {
            resolve(results);
        }).catch(function(err) {
            reject(err);
        });
    });
};

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

const saveImageUrlToDb = (file, session) => {
    return new Promise(function(resolve, reject) {
        const q = 'UPDATE users SET profile_pic_url = $1 WHERE id = $2 RETURNING profile_pic_url;';
        const params = [`/uploads/${file.filename}`, session.userId];
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
        const q = `INSERT INTO achievements (student_id, achievement_type, achievement_name, sender_id)
                    VALUES ($1, $2, $3, $4);`;
        const params = [requestedId, achievementType, achievementName, senderId];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
};


module.exports.checkIfUserExists = checkIfUserExists;
module.exports.addNewUserToDb = addNewUserToDb;
module.exports.getUserProfileInfo = getUserProfileInfo;
module.exports.saveImageUrlToDb = saveImageUrlToDb;
module.exports.getAllAchievements = getAllAchievements;
module.exports.getCountryOfUser = getCountryOfUser;
module.exports.getAllStudentsFromCountry = getAllStudentsFromCountry;
module.exports.giveAchievementToStudents = giveAchievementToStudents;
module.exports.insertOneAchievement = insertOneAchievement;
