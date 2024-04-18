const AppError = require('./AppError');
const { StatusCodes } = require("http-status-codes");

class UnauthorizedError extends AppError {
  constructor(message) {
    super(message, StatusCodes.UNAUTHORIZED);
    this.name = 'UnauthorizedError';
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, StatusCodes.UNPROCESSABLE_ENTITY);
    this.name = 'ValidationError';
  }
}

class BadRequestError extends AppError {
  constructor(message) {
    super(message, StatusCodes.BAD_REQUEST);
    this.name = 'BadRequestError';
  }
}

class ForbiddenError extends AppError {
    constructor(message) {
      super(message, StatusCodes.FORBIDDEN);
      this.name = 'ForbiddenError';
    }
  }

class AlreadyApprovedError extends AppError {
  constructor(message) {
    super(message, StatusCodes.CONFLICT);
    this.name = 'AlreadyApprovedError';
  }
}

class NotFoundError extends AppError {
    constructor(message) {
      super(message, StatusCodes.NOT_FOUND);
      this.name = 'NotFoundError';
    }
  }


module.exports = {
  UnauthorizedError,
  AlreadyApprovedError,
  NotFoundError,
  ForbiddenError,
  BadRequestError,
  ValidationError
};
