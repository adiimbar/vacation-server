let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error")


async function addUser(user) {
    let sql = 'INSERT INTO users (first_name, last_name, user_name, password) VALUES(?, ?, ?, ?)';
    let parameters = [user.firstName, user.lastName, user.userName, user.password];
    try {
        await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        console.log('inside add user erorr');
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST, JSON.stringify(user), e);
    }
}

async function getUser(userId) {
    let sql = "SELECT * FROM users WHERE user_id=?";
    let parameters = [userId];

    try {
        user = await connection.executeWithParameters(sql, parameters);
        // return user;
        }
    catch (e) {
        console.log('inside add user erorr');
        throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST, JSON.stringify(user), e);
    }

    return user;
}

async function login(user) {

    let sql = 'SELECT * FROM users WHERE user_name =? AND password =?';

    let parameters = [user.userName, user.password];
    // let usersLoginResult = await connection.executeWithParameters(sql, parameters);
    try {
        usersLoginResult = await connection.executeWithParameters(sql, parameters);
    }
    catch (e) {
        // This is an example, for a situation where a TECHNICAL ERROR HAD OCCURED
        // that error threw an exception - WHICH WE WANT TO WRAP with a ServerError
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), e);
    }

    return usersLoginResult;
    // return usersLoginResult[0];
}


module.exports = {
    addUser,
    getUser,
    login
};
