const Joi = require('joi');

const middleware = (schema, property) => {
  // console.log(schema);
  // console.log(property);

  const error = Joi.validate(
    property, schema, { abortEarly: false }).error;

  if (error) { // אם היתה שגיאה אחת או יותר
      // החזרת הודעות השגיאה בלבד
      return error.details.map(err => err.message);
  }

  // אם לא היתה שגיאה
  return null;
}

module.exports = middleware;