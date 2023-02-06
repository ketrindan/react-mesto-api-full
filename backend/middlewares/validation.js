const { celebrate, Joi } = require('celebrate');

const signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const signUpValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
});

const getUserIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex(),
  }),
});

const updateUserProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
});

const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^https?:\/\/(www)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+#?$/),
  }),
});

const getCardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});

module.exports = {
  signInValidation,
  signUpValidation,
  getUserIdValidation,
  updateUserProfileValidation,
  updateAvatarValidation,
  createCardValidation,
  getCardIdValidation,
};
