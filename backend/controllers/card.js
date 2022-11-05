const Card = require('../models/card');
const {
  CARD_CREATION_ERROR, CARD_INCORRECT_LIKE_DATA_ERROR, CARD_INCORRECT_ID_ERROR,
  INCORRECT_DATA_ERROR, FORBIDDEN_ERROR,
} = require('../errors/errors');
const NotFoundError = require('../errors/NotFoundError');
const checkError = require('../utils/checkError');
const ForbiddenError = require('../errors/ForbiddenError');

const getCards = (req, res, next) => {
  const limit = 10;
  Card.find({})
    .populate(['owner', 'likes'])
    .select('_id name link owner likes createdAt')
    .sort({ createdAt: -1 })
    .limit(limit)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { user } = req;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({
        name: card.name,
        link: card.link,
        owner: user._id,
        likes: card.likes,
        _id: card._id,
        createdAt: card.createdAt,
      });
    })
    .catch((err) => checkError(err, CARD_CREATION_ERROR, next));
};
const deleteCard = (req, res, next) => {
  const _id = req.params.cardId;
  const { user } = req;
  Card.findById(_id)
    .populate(['owner'])
    .then((card) => {
      if (!card) {
        return next(new NotFoundError(CARD_INCORRECT_ID_ERROR));
      }
      if (JSON.stringify(card.owner._id) !== JSON.stringify(user._id)) {
        return next(new ForbiddenError(FORBIDDEN_ERROR));
      }

      return Card.findByIdAndRemove(_id)
        .then((doc) => res.status(200).send({ card: doc, message: 'Удалено' }));
    })
    .catch((err) => checkError(err, INCORRECT_DATA_ERROR, next));
};
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFoundError(CARD_INCORRECT_ID_ERROR));
    }
    return res.status(200).send(card);
  })
    .catch((err) => checkError(err, CARD_INCORRECT_LIKE_DATA_ERROR, next));
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).then((card) => {
    if (!card) {
      return next(new NotFoundError(CARD_INCORRECT_ID_ERROR));
    }
    return res.status(200).send(card);
  })
    .catch((err) => checkError(err, CARD_INCORRECT_LIKE_DATA_ERROR, next));
};
module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};
