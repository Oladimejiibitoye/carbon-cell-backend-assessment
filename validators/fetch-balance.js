const { body} = require('express-validator');


const ethereumAddressValidation =  [
  body('address')
    .isEthereumAddress()
    .withMessage('Please provide a valid ethereum address')
]


module.exports = {ethereumAddressValidation}