const { successResMsg } = require("../helpers/response");
const DataRetrivalService = require("../services/data-retrival");
const {StatusCodes} = require("http-status-codes");


class DataRetrivalController {

  async dataRetrival(req, res, next) {
    try {
       /* 
        #swagger.tags = ['Data Retrival']
        #swagger.summary = 'Retrieve Data from a public api.'
        #swagger.description = 'The API allows you to filter data from a public api'
        #swagger.consumes = ['application/json']
        #swagger.produces = ['application/json']
        #swagger.parameters[category] = {
          required: false,
          description: 'Category to filter public data',
          in: 'query',
          type: 'number'
        }
        #swagger.parameters[page] = {
          required: false,
          description: 'page to filter public data',
          in: 'query',
          type: 'number'
        }
        #swagger.parameters[size] = {
          required: false,
          description: 'size to filter public data',
          in: 'query'
        }
        
        #swagger.responses[200] = {
          description: 'data retrieved successfully',
          schema: { $ref: '#/definitions/200' }
        }
      */
      const response = await DataRetrivalService.dataRetrivalService(req.query)
      return successResMsg(res, StatusCodes.OK, {
        message: "data retrieved successfully",
        data: response
      })
    } catch (error) {
      next(error)
    }
  }

}


module.exports = new DataRetrivalController()