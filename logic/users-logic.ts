import * as jwt from 'jsonwebtoken';
const config = require('../config.json');
// get user details from server cache
async function getMe(authorizationString) {

    // Removing the bearer prefix, leaving the clean token
    const token = authorizationString.substring("Bearer ".length);
    const userData = jwt.verify(token, config.secret);
    // console.log("***********" + usersCache);

    return userData;
}

module.exports = {
    getMe
};

let user = {
    firstName: 'Saruman',
    lastName: 'the white',
    userName: 'asdf',
    password: '1234'
}