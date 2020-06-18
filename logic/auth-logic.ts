const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const config = require('../config.json');
let ServerError = require("./../errors/server-error");
let ErrorType = require("../errors/error-type");
const validation = require("../validation/validation");
let usersDao = require("../dao/users-dao");

const SALT_RIGHT = "sdkjfhdskajh";
const SALT_LEFT = "--mnlcfs;@!$ ";


export async function addUser(user) {
    // validation
    await validation.userRegistrationValidation(user);

    // if (await usersDao.isUserExistByName(user.username)){
    //     throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
    // }

    // hash password
    user.password = crypto.createHash("md5").update(SALT_LEFT + user.password + SALT_RIGHT).digest("hex");

    await usersDao.addUser(user);
}

export async function login(user) {
    // validation
    await validation.userLoginValidation(user);

    // hash password
    user.password = crypto.createHash("md5").update(SALT_LEFT + user.password + SALT_RIGHT).digest("hex");

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

    const token = jwt.sign({
        sub: userName,
        ...userData
    }, config.secret);
    // save to cache

    return {token:token, userType:userType, userId: userId};
}