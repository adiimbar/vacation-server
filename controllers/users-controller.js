let usersLogic = require("../logic/users-logic");
const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const config = require('../config.json');

// login
router.post("/login", async (request, response) => {

    let user = request.body;
    // console.log('user log in controller value:');
    // console.log(user);

    try {
        let successfullLoginData = await usersLogic.login(user);
        response.json(successfullLoginData);

        // let email = successfullLoginData[0].email;
        // let userType = successfullLoginData[0].type;

        // const token = jwt.sign({ sub: email }, config.secret);
        // response.send({token:token, userType:userType});

    } catch (error) {
        console.log(error);
        response.status(401).json({ error: "Invalid user name or password" });
    }
});

// add user
router.post("/register", async (request, response) => {

    let user = request.body;
    // console.log('in the controller - add user: ' + user);

    try {
        await usersLogic.addUser(user);
        response.status(200).json({ date: "user added"});

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

// // getUser
// // router.get("/me", async (request, response) => {
// router.get("/:id", async (request, response) => {
//     try {
//         let user = await usersLogic.getUser(request.params.id);
//         response.json(user);
        
//     } catch (error) {
//         console.log(error);
//         response.status(401).send("No user in database");
//     }

// });


module.exports = router;
