let followersLogic = require("../logic/followers-logic");
const express = require("express");
const router = express.Router();

// add follower
router.post("/addFollower", async (request, response) => {

    let authorizationString = request.headers["authorization"];
    let requestObj = request.body;

    try {
        let successfullyAddedFollow = await followersLogic.addFollower(requestObj, authorizationString);
        response.json(successfullyAddedFollow);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// remove follower
router.delete("/:tourId", async (request, response) => {

    let tourId = request.params.tourId;
    let authorizationString = request.headers['authorization'];

    try {
        let successfullyRemovedFollower = await followersLogic.deleteSpecificTourFollow(tourId, authorizationString);
        response.json(successfullyRemovedFollower);
        // await followersLogic.deleteSpecificTourFollow(tourId, authorizationString);
        // response.status(200).json({data: 'follow removed'});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// get number of followers for each tour - data for charts
router.get("/", async (request, response) => {

    try {
        let usersToursFollowing = await followersLogic.getNumberOfFollowersForAllTours();
        response.json(usersToursFollowing);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

// not in use by client
// get user tours followings
router.get("/userFollowings", async (request, response) => {

    let authorizationString = request.headers['authorization'];

    try {
        let userFollowings = await followersLogic.getUserToursFollowing(authorizationString);
        response.json(userFollowings);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

// not in use by client
// get user's Specific tour follow status
router.get("/:tourId", async (request, response) => {

    let tourId = request.params.tourId;
    let authorizationString = request.headers['authorization'];

    try {
        let tourFollow = await followersLogic.getSpecificTourFollow(tourId, authorizationString);
        response.json(tourFollow);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});


module.exports = router;