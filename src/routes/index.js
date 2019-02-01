const authRouter = require('./auth');
const powerRouter = require('./power');

module.exports = function(app) {
  app.use('/auth', authRouter);
  app.use('/power', powerRouter);
};