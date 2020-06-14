let vacationsDao = require("../dao/vacations-dao");
const validation = require("../validation/validation");


async function addTour(tour) {

    // await validation.addTourValidation(tour);

    await vacationsDao.addTour(tour);
}

// Only by admin
async function updateTour(tour) {

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

async function getAllTours() {
    // Validations
    let tours = await vacationsDao.getAllTours();
    // let asdf = tours[0].end_date.toString();
    // tours[0].end_date = asdf;

    // console.log(asdf.substring(1, 10));
    // console.log(tours);

    return tours;
}




module.exports = {
    addTour,
    updateTour,
    getAllTours
};

