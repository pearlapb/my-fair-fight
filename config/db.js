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
            q = `INSERT INTO users (user_type, first_name, last_name, user_name, hashed_pw, age, country, city, school, profile_pic_url)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
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
                '/public/assets/unknown.png'
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
        const q = 'SELECT id, user_type, user_name, first_name, last_name, profile_pic_url FROM users WHERE id = $1;';
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

const insertOneAchievement = (requestedId, achType, achName) => {
    return new Promise(function(resolve, reject) {
        const q = `INSERT INTO achievements (student_id, achievement_type, achievement_name)
                    VALUES ($1, $2, $3)`;
        const params = [requestedId, achType, achName];
        db.query(q, params).then((res) => {
            resolve(res);
        }).catch((err) => {
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

module.exports.checkIfUserExists = checkIfUserExists;
module.exports.addNewUserToDb = addNewUserToDb;
module.exports.getUserProfileInfo = getUserProfileInfo;
module.exports.saveImageUrlToDb = saveImageUrlToDb;
module.exports.insertOneAchievement = insertOneAchievement;
module.exports.getAllAchievements = getAllAchievements;
