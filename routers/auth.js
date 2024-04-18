const AuthController = require("../controllers/auth");
const { validate } = require("../middlewares/validate");
const { signUpValidation, signInValidation} = require("../validators/auth");
const {auth} = require("../middlewares/auth")
const router = require("express").Router();

router.post('/sign-up', signUpValidation, validate, AuthController.signUp);

router.post('/sign-in', signInValidation, validate, AuthController.signIn);

router.get('/message', auth, AuthController.sendMessage)

module.exports = router;