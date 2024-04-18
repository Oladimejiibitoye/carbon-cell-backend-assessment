const { successResMsg } = require("../helpers/response");
const Web3Service = require("../services/web3");
const {StatusCodes} = require("http-status-codes");


class Web3Controller {

  async fetchBalance(req, res, next) {
    try {
       /* 
        #swagger.tags = ['Fetch Balance']
        #swagger.summary = 'Fetching Ethereum Balance.'
        #swagger.description = 'This Api allows user to fetch ethereum balance based on a specific address'
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters[fetch balance] = {
          required: true,
          description: 'fetch balance',
          in: 'body',
          schema: {$ref: '#/definitions/FetchBalance'}
        }
        #swagger.responses[200] = {
          description: 'Balance fetched successfully',
          schema: { $ref: '#/definitions/200' }
        }
      */
      const response = await Web3Service.fetchBalanceService(req.body.address)
      return successResMsg(res, StatusCodes.OK, {
        message: "Balance fetched successfully",
        data: response
      })
    } catch (error) {
      next(error)
    }
  }
}


module.exports = new Web3Controller()