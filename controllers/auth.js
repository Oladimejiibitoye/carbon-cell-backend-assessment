const { successResMsg } = require("../helpers/response");
const AuthService = require("../services/auth");
const {StatusCodes} = require("http-status-codes");


class AuthController {

  async signUp(req, res, next) {
    try {
       /* 
        #swagger.tags = ['Sign-up']
        #swagger.summary = 'User Registration.'
        #swagger.description = 'This Api allows user to create an account.'
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters[user registration] = {
          required: true,
          description: 'register user',
          in: 'body',
          schema: {$ref: '#/definitions/User'}
        }
        #swagger.responses[200] = {
          description: 'User successfully created',
          schema: { $ref: '#/definitions/200' }
        }
      */
      const response = await AuthService.signUpService(req.body)
      return successResMsg(res, StatusCodes.OK, {
        message: "User signUp successful",
        data: {userId: response}
      })
    } catch (error) {
      next(error)
    }
  }

  async signIn(req, res, next){
    try {
        /* 
        #swagger.tags = ['Sign-in']
        #swagger.summary = 'User Log-in.'
        #swagger.description = 'This Api allows user to log-in.'
        #swagger.consumes = ['application/json' ]
        #swagger.produces = ['application/json']
        #swagger.parameters[user log-in] = {
          required: true,
          description: 'Log-in user to a  particular account',
          in: 'body',
          schema: {$ref: '#/definitions/User'}
        }
        #swagger.responses[200] = {
          description: 'User successfully Log-in',
          schema: { $ref: '#/definitions/200' }
        }
        #swagger.responses[500] = {
          description: 'Server Issue',
          schema: { $ref: '#/definitions/500' }
        }
        #swagger.responses[404] = {
          description: 'Not found',
          schema: { $ref: '#/definitions/404' }
        }
      */
     const tokens = await AuthService.signInUserService(req.body, req.headers) 
     return successResMsg(res, StatusCodes.CREATED, {
      message: "User signIn successful",
      data: tokens
    })
    } catch (error) {
      next(error)
    }
  }

  async sendMessage(req, res, next){
    try {
        /* 
        #swagger.tags = ['Send Message']
        #swagger.summary = 'Protected route for sending message.'
        #swagger.description = 'This Api allows user to send message'
        #swagger.consumes = ['application/json' ]
        #swagger.produces = ['application/json']
        #swagger.responses[200] = {
          description: 'Message sent successfully',
          schema: { $ref: '#/definitions/200' }
        }
        #swagger.responses[500] = {
          description: 'Server Issue',
          schema: { $ref: '#/definitions/500' }
        }
        #swagger.responses[404] = {
          description: 'Not found',
          schema: { $ref: '#/definitions/404' }
        }
      */
     return successResMsg(res, StatusCodes.OK, {
      message: "Message sent successfully",
      data: 'Message is ok'
    })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = new AuthController()