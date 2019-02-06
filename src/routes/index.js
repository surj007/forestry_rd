const authRouter = require('./auth');
const userRouter = require('./user');
const testRouter = require('./test');

module.exports = function(app) {
  app.use('/auth', authRouter);
  app.use('/user', userRouter);
  app.use('/test', testRouter);
};