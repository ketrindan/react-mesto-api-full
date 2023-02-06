module.exports = ((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Произошла внутренняя ошибка сервера';

  res.status(status).send({ message });
  next();
});
