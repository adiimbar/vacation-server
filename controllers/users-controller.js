const usersLogic = require("../logic/users-logic");
const authLogic = require("../logic/auth-logic");
const express = require("express");
const router = express.Router();

// const errorHandler = require('../errors/error-handler');

// login
router.post("/login", async (request, response) => {

    let user = request.body;

    try {
        let successfullLoginData = await authLogic.login(user);
        response.json(successfullLoginData);

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid user name or password" });
    }
});

// add user
router.post("/register", async (request, response) => {

    let user = request.body;
   
    try {
        await authLogic.addUser(user);
        response.status(200).json({ data: "user added"});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "something went terribly wrong..." });
    }
});


router.get("/me", async (request, response)=>{
    
    let authorizationString = request.headers["authorization"];


    try {
        let userData = await usersLogic.getMe(authorizationString);

        // passing only these parameters to the user
        let user = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            userName: userData.userName
        }

        response.json(user);
        
    } catch (error) {
        console.log(error);
        response.status(401).send("No user in database");
    }

})

module.exports = router;
