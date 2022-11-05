const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUsersById, updateUser, updateUserAvatar, getUser,
} = require('../controllers/user');
const { URL_REGEXP } = require('../utils/constants');

const usersRoute = express.Router();
usersRoute.get('/', getUsers);
usersRoute.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEXP),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
usersRoute.get('/me', getUser);
usersRoute.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REGEXP),
  }),
}), updateUserAvatar);
usersRoute.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
}), getUsersById);
module.exports = usersRoute;
