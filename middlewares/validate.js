const { validationResult } = require('express-validator');
const { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const { param} = require('express-validator');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const resultErrors = [];
  errors.array().forEach((err) => resultErrors.push({ [err.path]: err.msg }));

  const errorObject = Object.assign({}, ...resultErrors);
  return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(errorObject);
};

/**
 * Success JSON to be sent
 * @param value - Enum value
 * @param type  - Enum type
 * @param arrayEnum - array of valid enum to be sent
 * @returns {Boolean} - true
 */
const enumCustom = (value, type, arrayEnum) => {
  if (!value) return Promise.reject(`${type} type cannot be empty`);
  if (!arrayEnum.includes(value)) {
    return Promise.reject(`${value} is not a valid ${type} type. Valid ${type} are: ${arrayEnum}`);
  }
};

const idValidationRules = (id) => [
  param(id)
  .notEmpty()
  .custom((value) => {
    return mongoose.Types.ObjectId.isValid(value)
  })
  .withMessage('Please provide a valid id')
];


module.exports = {
  validate,
  enumCustom,
  idValidationRules
}