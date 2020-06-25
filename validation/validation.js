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




// // Products validations
// async function addProductValidation(product) {
//     const errorDetails =  middleware(productSchema.addProduct, product);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }

// async function updateProductValidation(product) {
//     const errorDetails =  middleware(productSchema.updateProduct, product);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }

// async function getProductByNameValidation(productName) {
//     const errorDetails =  middleware(productSchema.getProductByName, productName);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }

// async function addCartItemValidation(cartItem) {
//     const errorDetails =  middleware(cartItemSchema.addCartItem, cartItem);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }

// async function updateCartItemValidation(cartItem) {
//     const errorDetails =  middleware(cartItemSchema.updateCartItem, cartItem);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }

// async function deleteItemFromCartValidation(cartItem) {
//     const errorDetails =  middleware(cartItemSchema.deleteItemFromCart, cartItem);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }

// async function emptyCartValidation(cartId) {
//     let cartItem = {
//         cartId: cartId
//     }
//     const errorDetails =  middleware(cartItemSchema.emptyCart, cartItem);
//     if (errorDetails) {
//         console.log(errorDetails);
//         throw new Error("Invalid details - failed validation");
//     }
// }


module.exports = {
    userLoginValidation,
    userRegistrationValidation,
    followObjValidation,
    followUserIdValidation,
    deleteTourValidation
};
