const Web3Controller = require("../controllers/fetch-balance");
const { validate } = require("../middlewares/validate");
const {ethereumAddressValidation} = require("../validators/fetch-balance");

const router = require("express").Router();

router.post('/fetch-balance', ethereumAddressValidation, validate, Web3Controller.fetchBalance);

module.exports = router;