const express = require('express');
const { celebrate, Joi } = require('celebrate');
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/card');
const { URL_REGEXP } = require('../utils/constants');

const cardsRoute = express.Router();
cardsRoute.get('/', getCards);
cardsRoute.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required(),//.pattern(URL_REGEXP),
  }),
}), createCard);
cardsRoute.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), deleteCard);
cardsRoute.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), likeCard);
cardsRoute.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
}), dislikeCard);
module.exports = cardsRoute;
