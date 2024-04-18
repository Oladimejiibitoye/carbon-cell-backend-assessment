// eslint-disable-next-line no-unused-vars

const {StatusCodes} = require("http-status-codes")
const { INTERNAL_SERVER_ERROR, INVALID_TOKEN } = require('../helpers/constants');
const { errorResMsg } = require('../helpers/response');

const errorHandler = (err, req, res, next) => {
  if (typeof err === 'string') {
    // custom application error
    return errorResMsg(res, StatusCodes.BAD_REQUEST, err.message );
  }

  if (err.inner !== undefined) {
    if (err.inner.name === 'JsonWebTokenError') {
      // jwt authentication error
      return errorResMsg(res, StatusCodes.UNAUTHORIZED, INVALID_TOKEN );
    }
  }
  if (err.name === 'UnauthorizedError') {
    // jwt params error
    return errorResMsg(res, StatusCodes.UNAUTHORIZED, err.message );
  }

  // default to HttpStatus.INTERNAL_SERVER_ERROR server error
  return errorResMsg(res, err?.statusCode || StatusCodes.INTERNAL_SERVER_ERROR, err.message);
};

module.exports.errorHandler = errorHandler;
