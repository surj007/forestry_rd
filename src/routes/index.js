const authRouter = require('./auth');
const userRouter = require('./system/user');
const roleRouter = require('./system/role');
const permissionRouter = require('./system/permission');
const menuRouter = require('./menu');
const ossRouter = require('./oss');
const basicRouter = require('./basic');
const testRouter = require('./test');

module.exports = function(app) {
  app.use('/auth', authRouter);

  app.use('/system/user', userRouter);
  app.use('/system/role', roleRouter);
  app.use('/system/permission', permissionRouter);

  app.use('/menu', menuRouter);

  app.use('/oss', ossRouter);

  app.use('/basic', basicRouter);

  app.use('/test', testRouter);
};