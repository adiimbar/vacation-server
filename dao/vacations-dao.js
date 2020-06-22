let connection = require("./connection-wrapper");

// Only by admin
async function addTour(tour) {
    let sql = 'INSERT INTO tours (destination, description, image_path, start_date, end_date, price) VALUES(?, ?, ?, ?, ?, ?)';
    let parameters = [tour.destination, tour.description, tour.image_path, tour.start_date, tour.end_date, tour.price];
    let newTour = await connection.executeWithParameters(sql, parameters);
    return newTour.insertId
}

// Only by admin
async function updateTour(tour) {
    let sql = "UPDATE tours SET destination = ?, description = ?, image_path = ?, start_date = ?, end_date = ?, price = ? WHERE id = ? ";
    let parameters = [tour.destination, tour.description, tour.image_path, tour.start_date, tour.end_date, tour.price, tour.id];
    await connection.executeWithParameters(sql, parameters);
    let updatedTourId = tour.id;
    return updatedTourId
}

// increment and decrement will be quite demanding, 
// if there where a lot of users and the amount of follow requests would be high,
// the thought is to make an update every once in a while and push the amount of follow requests that have accumulated.
// right now it's done thes way for accuracy
async function incrementFollowersByOne(tourObj) {
    let sql = "UPDATE tours SET followers = followers + 1 WHERE id = ? ";
    let parameters = [tourObj.tourId];
    await connection.executeWithParameters(sql, parameters);
}

async function decrementFollowersByOne(tourObj) {
    let sql = "UPDATE tours SET followers = followers - 1 WHERE id = ? ";
    let parameters = [tourObj.tourId];
    await connection.executeWithParameters(sql, parameters);
}

async function updateTourFollowers(tour) {
    let sql = "UPDATE tours SET followers = ? WHERE id = ? ";
    let parameters = [tour.followers, tour.id];
    await connection.executeWithParameters(sql, parameters);
}

// geting user tours and adding it a column with user follow state
async function getAllToursForUser(userId) {
    let sql = "SELECT t.*, f.tour_id AS isFollowed " +
                "FROM tours t LEFT JOIN followers f " +
                "ON f.tour_id = t.id AND f.user_id = ?";

    let parameters = [userId];
    let tours = await connection.executeWithParameters(sql, parameters);
    return tours;
}

async function getTourById(tourId) {
    let sql = "SELECT * FROM tours WHERE id = ?";
    let parameters = [tourId];
    let tour = await connection.executeWithParameters(sql, parameters);
    return tour;
}

module.exports = {
    addTour,
    incrementFollowersByOne,
    decrementFollowersByOne,
    updateTour,
    getAllToursForUser,
    getTourById,
    updateTourFollowers
};
