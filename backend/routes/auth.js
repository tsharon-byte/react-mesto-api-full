const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { createUser, login } = require('../controllers/user');
const { URL_REGEXP } = require('../utils/constants');

const route = express.Router();
route.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEXP),
    about: Joi.string().min(2).max(30),
  }),
}), createUser);
route.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
route.post('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});
module.exports = route;
