let connection = require("./connection-wrapper");


async function addFollower(followObj) {
    let sql = 'INSERT INTO followers (user_id, tour_id) VALUES(?, ?)';
    let parameters = [followObj.userId, followObj.tourId];
    await connection.executeWithParameters(sql, parameters);
}

async function deleteSpecificTourFollow(followObj) {
    let sql = "DELETE FROM followers WHERE (user_id = ? AND tour_id = ?)";
    let parameters = [followObj.userId, followObj.tourId];
    await connection.executeWithParameters(sql, parameters);    
}

async function getSpecificTourFollow(followObj) {
    let sql = "SELECT * FROM followers WHERE (user_id = ? AND tour_id = ?)";
    let parameters = [followObj.userId, followObj.tourId];
    let tourFollow = await connection.executeWithParameters(sql, parameters);
    // console.log(tourFollow);
    return tourFollow;
}

async function getUserToursFollowing(followObj) {
    let sql = "SELECT tour_id FROM followers WHERE user_id = ?";
    let parameters = [followObj.userId];
    let userToursFollowing = await connection.executeWithParameters(sql, parameters);
    // console.log(userToursFollowing);
    return userToursFollowing;
}

async function getNumberOfFollowersForAllTours() {
    let sql = "SELECT COUNT(user_id) AS numOfFollowers, tour_id FROM followers GROUP BY tour_id";
    let userToursFollowing = await connection.execute(sql);
    // console.log(userToursFollowing);
    return userToursFollowing;
}
  



module.exports = {
    addFollower,
    deleteSpecificTourFollow,
    getSpecificTourFollow,
    getUserToursFollowing,
    getNumberOfFollowersForAllTours
};

// followObj = {
//     userId: 8,
//     tourId: 2
// }

// addFollower(followObj);
// deleteSpecificTourFollow(followObj);
// getSpecificTourFollow(followObj);
// getUserToursFollowing(followObj.userId);
// getNumberOfFollowersForAllTours()