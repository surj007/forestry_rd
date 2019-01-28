const authRouter = require('./auth');

module.exports = function(app) {
  app.use('/auth', authRouter);
};