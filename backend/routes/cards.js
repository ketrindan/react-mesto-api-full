const cardRouter = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

const {
  createCardValidation,
  getCardIdValidation,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);

cardRouter.post('/', createCardValidation, createCard);

cardRouter.delete('/:cardId', getCardIdValidation, deleteCard);

cardRouter.put('/:cardId/likes', getCardIdValidation, likeCard);

cardRouter.delete('/:cardId/likes', getCardIdValidation, dislikeCard);

module.exports = cardRouter;
