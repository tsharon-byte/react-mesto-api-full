const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const checkError = (err, message, next) => {
  if (err.name === 'CastError' || err.name === 'ValidationError') {
    return next(new BadRequestError(message));
  }
  if (err.code === 11000) {
    return next(new ConflictError());
  }
  return next(err);
};
module.exports = checkError;
