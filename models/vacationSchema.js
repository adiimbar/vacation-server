const Joi = require('joi');


const vacationSchema = {

  delete: {
    userType: Joi.string()
        // .validate({ userType: 'ADMIN' })
        .required(),

    tourId: Joi.number()
        .required()
  },
  addTour: {
    destination: Joi.string()
      .required(),

    description: Joi.string()
      .required(),

    image_path: Joi.string()
      .required(),

    start_date: Joi.string()
      .required(),

    end_date: Joi.string()
      .required(),

    price: Joi.number()
      .required()
  },
  updateTour: {
    destination: Joi.string()
      .required(),

    description: Joi.string()
      .required(),

    image_path: Joi.string()
      .required(),

    start_date: Joi.string()
      .required(),

    end_date: Joi.string()
      .required(),

    price: Joi.number()
      .required(),

    id: Joi.number()
      .required()

  }


};

module.exports = vacationSchema;