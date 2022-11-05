const mongoose = require('mongoose');
const { URL_REGEXP } = require('../utils/constants');
const { isUrl, isEmail} = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return URL_REGEXP.test(v);
      },
      message: 'Неправильный формат URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    default: [],
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model('card', cardSchema);
