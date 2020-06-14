let followersDao = require("../dao/followers-dao");
let usersLogic = require("./users-logic");
const validation = require("../validation/validation");


async function addFollower(requestObj, authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);

    let followObj = {
        tourId: requestObj.tourId,
        userId: userCacheData.userId
    }

    await validation.followObjValidation(followObj);
    
    await followersDao.addFollower(followObj);
}

async function deleteSpecificTourFollow(tourId, authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);

    let followObj = {
        tourId: tourId,
        userId: userCacheData.userId
    }

    await validation.followObjValidation(followObj);

    await followersDao.deleteSpecificTourFollow(followObj);
}

async function getSpecificTourFollow(tourId, authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);

    let followObj = {
        tourId: tourId,
        userId: userCacheData.userId
    }

    await validation.followObjValidation(followObj);

    let tourFollow = await followersDao.getSpecificTourFollow(followObj);
    // console.log(tourFollow);
    return tourFollow;
}

async function getUserToursFollowing(authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);
    let userId = userCacheData.userId;

    let followObj = {
        userId: userId
    }

    await validation.followUserIdValidation(followObj);

    let userToursFollowing = await followersDao.getUserToursFollowing(followObj);
    // console.log(userToursFollowing);
    return userToursFollowing;
}

async function getNumberOfFollowersForAllTours() {
    let usersToursFollowing = await followersDao.getNumberOfFollowersForAllTours();
    // console.log(usersToursFollowing);
    return usersToursFollowing;
}


module.exports = {
    addFollower,
    deleteSpecificTourFollow,
    getSpecificTourFollow,
    getUserToursFollowing,
    getNumberOfFollowersForAllTours
};

