const userRouter = require('express').Router();
const {
  getUsers, getUserById, updateUserProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

const {
  getUserIdValidation,
  updateUserProfileValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

userRouter.get('/', getUsers);

userRouter.get('/me', getCurrentUser);

userRouter.get('/:userId', getUserIdValidation, getUserById);

userRouter.patch('/me', updateUserProfileValidation, updateUserProfile);

userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;
