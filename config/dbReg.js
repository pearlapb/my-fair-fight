var spicedPg = require('spiced-pg');
var dbUrl = process.env.DATABASE_URL || "postgres:funkyChicken:letmein@localhost:5432/myfairfight";
var db = spicedPg(dbUrl);

const getAllOngoingProjectsForReg = () => {
    return new Promise(function(resolve, reject) {
        const q = `SELECT *
                    FROM projects
                    WHERE status = 'ongoing';`;
        db.query(q, []).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    });
};

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
            q = `INSERT INTO users (account_status, user_type, first_name, last_name, user_name, hashed_pw, age, country, city, school, profile_color, profile_pic_url)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
                        RETURNING *;`;
            params = [
                'active',
                newUserInfo.userType,
                newUserInfo.firstName,
                newUserInfo.lastName,
                newUserInfo.userName,
                newUserInfo.hashedPw,
                newUserInfo.age,
                newUserInfo.country,
                newUserInfo.city,
                newUserInfo.school,
                'bloody-mary',
                '/public/assets/unknown.png'
            ];
        // IF NEW USER IS A TEACHER (add coutry later on!)
        } else if (newUserInfo.userType == 'teacher') {
            q = `INSERT INTO users (account_status, user_type, first_name, last_name, user_name, hashed_pw, country, profile_pic_url, profile_color)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        RETURNING *;`;
            params = [
                'active',
                newUserInfo.userType,
                newUserInfo.firstName,
                newUserInfo.lastName,
                newUserInfo.userName,
                newUserInfo.hashedPw,
                newUserInfo.country,
                '/public/assets/unknown.png',
                'new-blue'
            ];
        // IF NEW USER IS A FF MEMBER
        } else if (newUserInfo.userType == 'FFmember') {
            q = `INSERT INTO users (account_status, user_type, first_name, last_name, user_name, hashed_pw, profile_pic_url, profile_color)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING *;`;
            params = [
                'active',
                newUserInfo.userType,
                newUserInfo.firstName,
                newUserInfo.lastName,
                newUserInfo.userName,
                newUserInfo.hashedPw,
                '/public/assets/unknown.png',
                'rose-water'
            ];
        }
        db.query(q, params).then(function(results) {
            resolve(results);
        }).catch(function(err) {
            reject(err);
        });
    });
};

module.exports.checkIfUserExists = checkIfUserExists;
module.exports.addNewUserToDb = addNewUserToDb;
module.exports.getAllOngoingProjectsForReg = getAllOngoingProjectsForReg;
