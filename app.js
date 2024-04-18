const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require('helmet');
const logger = require('morgan');
const rtracer = require('cls-rtracer');
const { errorHandler } = require("./middlewares/error-handler");
const { StatusCodes } = require("http-status-codes");
const { errorResMsg } = require("./helpers/response");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger.json");
const authRouter = require("./routers/auth")
const dataRetrivalRouter = require("./routers/data-retrival")
const fetchBalanceRouter = require("./routers/fetch-balance")

const app = express();

//middleWares
app.use(helmet.hidePoweredBy());

app.use(express.json({ limit: "200mb" }));
app.use(
  express.urlencoded({
    limit: "200mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(cors());

app.use(rtracer.expressMiddleware());

// logging
const loggerFormat =
  '[:requestId] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"';
app.use(logger(loggerFormat)); // to output stream logss to the console
logger.token("requestId", () => rtracer.id());


// Serve Swagger documentation
app.use("/api/v1/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/data-retrival", dataRetrivalRouter)
app.use("/api/v1/web3", fetchBalanceRouter)


// Global error handler
app.use(errorHandler);

app.use((_, res) => {
  errorResMsg(res, StatusCodes.NOT_FOUND, "Endpoint not found");
});

module.exports = app;
