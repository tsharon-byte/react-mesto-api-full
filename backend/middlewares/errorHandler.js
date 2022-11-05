const { DEFAULT_MESSAGE_ERROR } = require('../errors/errors');

const errorHandler = (error, req, res, next) => {
  const { statusCode, message } = error;
  const status = statusCode || 500;
  const mes = statusCode && message ? message : DEFAULT_MESSAGE_ERROR;
  res.status(status).send({ message: mes });
  next();
};
module.exports = errorHandler;
