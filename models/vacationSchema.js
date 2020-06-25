const Joi = require('joi');


const vacationSchema = {

  delete: {
    userType: Joi.string()
        // .validate({ userType: 'ADMIN' })
        .required(),

    tourId: Joi.number()
        .required()
  },
  userIdCheck: {
    userId: Joi.number()
        .required()
  }

};

module.exports = vacationSchema;