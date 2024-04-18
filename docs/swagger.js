const {StatusCodes} = require("http-status-codes");

/* Swagger configuration */
const options = {
  openapi: 'OpenAPI 3',   
  language: 'en-US',      
  disableLogs: false,     
  autoHeaders: true,     
  autoQuery: false,       
  autoBody: true         
}

const swaggerAutogen = require('swagger-autogen')();

const doc = {
info: {
  version: '1.0.0',      // by default: '1.0.0'
  title: 'Carbon Cell Backend Assessment',        // by default: 'REST API'
  description: 'API for Assessment Task',  // by default: ''
  contact: {
      'name': 'API Support',
      'email': 'stephen_ibitoye@yahoo.com'
  },
},
host: "localhost:5000",
basePath: '/',  // by default: '/'
schemes: ['http'],   // by default: ['http']
consumes: ['application/json'],  // by default: ['application/json']
produces: ['application/json'],  // by default: ['application/json']
tags: [        // by default: empty Array
  {
    name: 'Sign-up',         // Tag name
    description: 'User registration api',  // Tag description
  },
  {
      name: 'Sign-in',
      description: 'User log-in api'
  }
],
securityDefinitions: {},  // by default: empty object
definitions: {
  FetchBalance: {
    address: 'string'
  },

  User: {
    email: 'string',
    password: 'string'
  },

  200: {
    code: '200',
    message: 'ok',
  },
  400: {
    code: '400',
    message: 'Bad Request',
  },
  403: {
    code: '403',
    message: 'Forbidden',
  },
  404: {
    "code": "404",
    "message": "Not found",
  },
  500: {
    "code": "500",
    "message": "Internal Server Error",
  },

},          // by default: empty object (Swagger 2.0)

};

const outputFile = './docs/swagger.json';
const endpointsFiles = ['./app.js', './controllers/*.js'];

/* NOTE: if you use the express Router, you must pass in the 
 'endpointsFiles' only the root file where the route starts,
 such as: index.js, app.js, routes.js, ... */
swaggerAutogen(outputFile, endpointsFiles, doc);