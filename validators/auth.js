const { body} = require('express-validator');

const signUpValidation = async (req, res, next) => {

  await body('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Please provide a valid email address')
  .run(req)

  await body('password')
  .trim()
  .exists()
  .notEmpty()
  .withMessage("Password is missing")
  .isLength({ min: 10, max: 32 })
  .withMessage("Password must be at least 10 to 32 characters longs!")
  .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
  .withMessage("password must contain the following: a capital letter, a number and a special character")
  .run(req)

  next()
}

const signInValidation =  [
body('email')
  .normalizeEmail()
  .isEmail()
  .withMessage('Please provide a valid email address'),

 body('password')
  .trim()
  .exists()
  .notEmpty()
  .withMessage("Password is missing")
]


module.exports = {
  signUpValidation, 
  signInValidation,
}