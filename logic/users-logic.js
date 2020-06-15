let usersDao = require("../dao/users-dao");
const jwt = require('jsonwebtoken');
const config = require('../config.json');
let ServerError = require("./../errors/server-error");
let ErrorType = require("../errors/error-type");

const crypto = require("crypto");
const saltRight = "sdkjfhdskajh";
const saltLeft = "--mnlcfs;@!$ ";

const usersCache = new Map();

const validation = require("../validation/validation");



async function addUser(user) {
    // validation
    await validation.userRegistrationValidation(user);

    // if (await usersDao.isUserExistByName(user.username)){
    //     throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    // }

    // hash password
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");

    await usersDao.addUser(user);
}

async function login(user) {
    // validation
    await validation.userLoginValidation(user);

    // hash password
    user.password = crypto.createHash("md5").update(saltLeft + user.password + saltRight).digest("hex");

    let usersLoginResult = await usersDao.login(user);

    if (usersLoginResult == null || usersLoginResult.length == 0) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    let userType = usersLoginResult[0].user_type;
    let userId = usersLoginResult[0].id;
    let firstName = usersLoginResult[0].first_name;
    let lastName = usersLoginResult[0].last_name;
    let userName = usersLoginResult[0].user_name;
    
    // //  Creates a cart for the user if he dose not have one
    // if (cartId === null) {
    //     await cartsLogic.addCart(userId);
    //     newCartId = await cartsLogic.getCartByUserId(userId);
    //     cartId = newCartId[0].cart_id;
    // }

    let userData = {
        userId: userId,
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        userName: userName
    };

    const token = jwt.sign({ sub: userName }, config.secret);
    // save to cache
    usersCache.set(token, userData);


    return {token:token, userType:userType, userId: userId};
}

// get user details from server cache
async function getMe(authorizationString) {

    // Removing the bearer prefix, leaving the clean token
    let token = authorizationString.substring("Bearer ".length);
    let userData = usersCache.get(token);

    // console.log("***********" + usersCache);

    return userData;
}


// async function getUser(id) {

//     // let authorizationString = request.headers["authorization"];

//     // // Removing the bearer prefix, leaving the clean token
//     // let token = authorizationString.substring("Bearer ".length);
//     // let userData = usersCache.get(token);

//     let user = await usersDao.getUser(id);
//     // console.log(user);
//     return user;
// }






module.exports = {
    addUser,
    // getUser,
    login,
    getMe
};

let user = {
    firstName: 'Saruman',
    lastName: 'the white',
    userName: 'asdf',
    password: '1234'
}

// addUser(user);

// login(user);