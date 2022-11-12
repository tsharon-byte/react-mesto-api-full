const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  INCORRECT_DATA_ERROR,
  USER_CREATION_DATA_ERROR,
  USER_PATCH_INCORRECT_AVATAR_ERROR,
  USER_PATCH_INCORRECT_ERROR, USER_NOT_FOUND_ERROR,
} = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const checkError = require('../utils/checkError');

const getUsers = (req, res, next) => {
  User.find({})
    .select('_id name about avatar email')
    .then((users) => {
      res.status(200).send(users);
    }).catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const getUser = (req, res, next) => {
  const { user } = req;
  User.findById(user._id)
    .select('_id name about avatar email')
    .then((doc) => {
      res.status(200).send(doc);
    }).catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.status(200).send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar,
      });
    })
    .catch((err) => checkError(err, USER_PATCH_INCORRECT_ERROR, next));
};
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.status(200).send({
        _id: user._id, name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      });
    })
    .catch((err) => checkError(err, USER_PATCH_INCORRECT_AVATAR_ERROR, next));
};
const getUsersById = (req, res, next) => {
  const _id = req.params.userId;
  User.findById(_id)
    .select('_id name about avatar')
    .then((user) => {
      if (!user) {
        return next(new NotFoundError(USER_NOT_FOUND_ERROR));
      }
      return res.status(200).send(user);
    }).catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name, about, avatar,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
    }))
    .catch((err) => checkError(err, USER_CREATION_DATA_ERROR, next));
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const { JWT_KEY = 'sekreto' } = process.env;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_KEY,
        { expiresIn: '7d' },
      );
      return res
        .cookie('jwt', token, {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        }).send({ message: 'Успешный логин' });
    })
    .catch((err) => next(err));
};
module.exports = {
  getUsers, getUsersById, createUser, updateUser, updateUserAvatar, getUser, login,
};
