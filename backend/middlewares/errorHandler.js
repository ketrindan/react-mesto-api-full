module.exports = ((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'На сервере произошла ошибка';

  res.status(status).send({ message });
  next();
});
