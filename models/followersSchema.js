const Joi = require('joi');


const followersSchema = {

  follow: {
    userId: Joi.number()
      .required(),

    tourId: Joi.number()
      .required()
  },
  userIdCheck: {
    userId: Joi.number()
      .required()
  }

};

module.exports = followersSchema;