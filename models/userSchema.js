const Joi = require('joi');


const userSchemas = {

  login: {
    userName: Joi.string()
      .required(),

    password: Joi.string()
      // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(), // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/),
  },
  registration: {
    userName: Joi.string()
      .required(),

    password: Joi.string()
      // .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required(),

    //   // need to be fixed
    // confirmPassword: Joi.any().valid(Joi.ref('password')).required(),
    // // .ref('password'),

    firstName: Joi.string()
      .required(),

    lastName: Joi.string()
      .required()
  }

};

module.exports = userSchemas;