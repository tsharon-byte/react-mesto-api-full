const NotFoundError = require('../errors/NotFoundError');
const { PAGE_NOT_FOUND_ERROR } = require('../errors/errors');

const pageNotFound = (req, res, next) => {
  next(new NotFoundError(PAGE_NOT_FOUND_ERROR));
};
module.exports = pageNotFound;
