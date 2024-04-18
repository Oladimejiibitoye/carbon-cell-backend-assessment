
const DataRetrivalController = require("../controllers/data-retrival");

const router = require("express").Router();

router.get('/', DataRetrivalController.dataRetrival);

module.exports = router;