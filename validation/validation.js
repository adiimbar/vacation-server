// let ErrorType = require("../errors/error-type");
// let ServerError = require("../errors/server-error");

const userSchemas = require('../models/userSchema');
const followersSchema = require('../models/followersSchema');
const vacationSchema = require('../models/vacationSchema');
const middleware = require('../middleware/Joi-middlewere');


// User validations:
async function userLoginValidation(user) {
    const errorDetails =  middleware(userSchemas.login, user);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}

async function userRegistrationValidation(user) {
    const errorDetails =  middleware(userSchemas.registration, user);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}

// followers validations:
async function followObjValidation(followObj) {
    const errorDetails =  middleware(followersSchema.follow, followObj);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}

async function followUserIdValidation(userId) {
    const errorDetails =  middleware(followersSchema.userIdCheck, userId);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}

// vacation validations:
async function deleteTourValidation(deleteTourObj) {
    const errorDetails =  middleware(vacationSchema.delete, deleteTourObj);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}

async function addTourValidation(tourObj) {
    const errorDetails =  middleware(vacationSchema.addTour, tourObj);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}

async function updateTourValidation(tourObj) {
    const errorDetails =  middleware(vacationSchema.updateTour, tourObj);
    if (errorDetails) {
        console.log(errorDetails);
        throw new Error("Invalid details - failed validation");
    }
}


module.exports = {
    userLoginValidation,
    userRegistrationValidation,
    followObjValidation,
    followUserIdValidation,
    deleteTourValidation,
    addTourValidation,
    updateTourValidation
};
