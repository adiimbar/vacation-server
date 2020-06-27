let vacationsLogic = require("../logic/vacations-logic");
const express = require("express");
const router = express.Router();

// add tour - only by admin
router.post("/", async (request, response) => {

    let tour = request.body;
    let authorizationString = request.headers['authorization'];

    try {
        let successfullyAddedTour = await vacationsLogic.addTour(tour, authorizationString);
        response.json(successfullyAddedTour);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

// update tour - only by admin
router.put("/", async (request, response) => {

    let tour = request.body;
    let authorizationString = request.headers['authorization'];

    try {
        await vacationsLogic.updateTour(tour, authorizationString);
        response.status(200).json({ date: "secessus! tour updated"});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid tour details" });
    }
});

// get all tours
router.get("/", async (request, response) => {

    let authorizationString = request.headers["authorization"];

    try {
        let allTours = await vacationsLogic.getAllToursForUser(authorizationString);
        response.json(allTours);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

// remove vacation
router.delete("/:tourId", async (request, response) => {

    let tourId = request.params.tourId;
    let authorizationString = request.headers['authorization'];

    try {
        let successfullyRemovedVacation = await vacationsLogic.deleteTour(tourId, authorizationString);
        response.json(successfullyRemovedVacation);
        // await followersLogic.deleteSpecificTourFollow(tourId, authorizationString);
        // response.status(200).json({data: 'follow removed'});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

module.exports = router;