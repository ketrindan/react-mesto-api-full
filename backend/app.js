const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const {
  signInValidation,
  signUpValidation,
} = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGODB_PATH = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = 'some-secret-key';
}

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_PATH, {
  useNewUrlParser: true,
});

app.use(requestLogger);

app.post('/signin', signInValidation, login);
app.post('/signup', signUpValidation, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
