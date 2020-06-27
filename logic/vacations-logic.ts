const vacationsDao = require("../dao/vacations-dao");
const usersLogic = require("./users-logic");
// const followersLogic = require("./followers-logic");
const followersDao = require("../dao/followers-dao");
const validation = require("../validation/validation");

import { exportSocketGateway } from '../app';


// Only by admin
async function addTour(tour, authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);

    // validate for admin
    // need to move it to validation file and call it from there
    if(!(userCacheData.userType === 'ADMIN')) {
        throw new Error("Invalid user type - not ADMIN, userId is: " + userCacheData.userId);
    }

    await validation.addTourValidation(tour);

    let newTourId = await vacationsDao.addTour(tour);
    let newTour = await vacationsDao.getTourById(newTourId);

    exportSocketGateway.publishNewTourToUsers(newTour[0]);
}

// Only by admin
async function updateTour(tour, authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);

    // validate for admin
    // need to move it to validation file and call it from there
    if(!(userCacheData.userType === 'ADMIN')) {
        throw new Error("Invalid user type - not ADMIN, userId is: " + userCacheData.userId);
    }

    
    let oldTourDetails = await vacationsDao.getTourById(tour.tourId);

    // need to make sure all options are coverd
    if(tour.start_date == '') {
        tour.start_date = oldTourDetails[0].start_date;
    }
    if(tour.end_date == '') {
        tour.end_date = oldTourDetails[0].end_date;
    }
    if(tour.image_path == '') {
        tour.image_path = oldTourDetails[0].image_path;
    }

    
    await validation.updateTourValidation(tour);

    let updatedTourId = await vacationsDao.updateTour(tour);
    let updatedTour = await vacationsDao.getTourById(updatedTourId);

    exportSocketGateway.publishUpdatedTourToUsers(updatedTour[0]);
}

async function getAllToursForUser(authorizationString) {
    // Validations

    let userData = await usersLogic.getMe(authorizationString);
    let userId = userData.userId;
    // console.log(userData);

    let tours = await vacationsDao.getAllToursForUser(userId);

    return tours;
}

async function incrementFollowersByOne(tour) {

    // await validation.addTourValidation(tour);

    await vacationsDao.incrementFollowersByOne(tour);
}

async function decrementFollowersByOne(tour) {

    // await validation.addTourValidation(tour);

    await vacationsDao.decrementFollowersByOne(tour);
}

async function deleteTour(tourId, authorizationString) {

    let userCacheData = await usersLogic.getMe(authorizationString);

    if(!(userCacheData.userType === 'ADMIN')) {
        throw new Error("Invalid user type - not ADMIN, userId is: " + userCacheData.userId);
    }

    let deleteTourObj = {
        tourId: tourId,
        userType: userCacheData.userType
    }

    await validation.deleteTourValidation(deleteTourObj);

    if(deleteTourObj.userType === 'ADMIN') {
        await Promise.all([
            vacationsDao.deleteTour(tourId),
            followersDao.deleteTourFromFollowersTable(tourId)
        ])

        return tourId

    } else {
        throw new Error("Invalid user type - not ADMIN");
    }

}

module.exports = {
    addTour,
    updateTour,
    getAllToursForUser,
    incrementFollowersByOne,
    decrementFollowersByOne,
    deleteTour
};

