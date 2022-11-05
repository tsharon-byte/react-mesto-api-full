const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { UNAUTHORIZED_ERROR } = require('../errors/errors');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  const { JWT_KEY = 'sekreto' } = process.env;
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (err) {
    return next(new UnauthorizedError(UNAUTHORIZED_ERROR));
  }
  req.user = payload;
  return next();
};
module.exports = auth;
