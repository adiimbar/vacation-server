let vacationsLogic = require("../logic/vacations-logic");
const express = require("express");
const router = express.Router();


router.post("/", async (request, response) => {

    let tour = request.body;

    try {
        let successfullyAddedTour = await vacationsLogic.addTour(tour);
        response.json(successfullyAddedTour);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});

router.put("/", async (request, response) => {

    let tour = request.body;

    try {
        await vacationsLogic.updateTour(tour);
        response.status(200).json({ date: "secessus! tour updated"});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid tour details" });
    }
});

router.get("/", async (request, response) => {
    try {
        let allTours = await vacationsLogic.getAllTours();
        response.json(allTours);

    } catch (error) {
        console.log(error);
        response.status(401).send("something went terribly wrong...");
    }

});

// router.get("/:id", async (request, response) => {

//     let categoryId = request.params.id;

//     try {
//         let products = await vacationsLogic.getAllProductsByCategoryId(categoryId);
//             // console.log(products);
//             response.json(products);

//     } catch (error) {
//         console.log(error);
//         response.status(401).send("something went terribly wrong...");
//     }

// });

// router.get("/getProduct/:name", async (request, response) => {

//     let productName = request.params.name;

//     try {
//         let product = await vacationsLogic.getProductByName(productName);
//             response.json(product);

//     } catch (error) {
//         console.log(error);
//         response.status(401).send("something went terribly wrong...");
//     }

// });

module.exports = router;