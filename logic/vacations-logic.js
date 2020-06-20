const vacationsDao = require("../dao/vacations-dao");
const usersLogic = require("./users-logic");
// const followersLogic = require("./followers-logic");
const validation = require("../validation/validation");


async function addTour(tour) {

    // await validation.addTourValidation(tour);

    let newTour = await vacationsDao.addTour(tour);
    // need to pass data to the websocket and from there to the users
}

// Only by admin
async function updateTour(tour) {

    console.log('inside update tour logic');

    let oldTourDetails = await vacationsDao.getTourById(tour.tourId);

    // need to make sure evry all options are coverd
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

    await vacationsDao.updateTour(tour);
}

async function getAllTours(authorizationString) {
    // Validations

    let userData = await usersLogic.getMe(authorizationString);
    let userId = userData.userId;
    // console.log(userData);

    let tours = await vacationsDao.getAllTours(userId);
    // let userFollowing = await followersLogic.getUserToursFollowing(authorizationString)

    // let [
    //     tours,
    //     userFollowing
    // ] = await Promise.all([
    //     vacationsDao.getAllTours(),
    //     followersLogic.getUserToursFollowing(authorizationString)    
    // ])

    // console.log(userFollowing);
    // console.log(tours);
    // let asdf = tours[0].end_date.toString();
    // tours[0].end_date = asdf;

    // console.log(asdf.substring(1, 10));
    // console.log(tours);

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


module.exports = {
    addTour,
    updateTour,
    getAllTours,
    incrementFollowersByOne,
    decrementFollowersByOne
};

