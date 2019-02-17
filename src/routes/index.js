const authRouter = require('./auth');
const menuRouter = require('./menu');
const ossRouter = require('./oss');
const testRouter = require('./test');
const userRouter = require('./system/user');
const roleRouter = require('./system/role');
const permissionRouter = require('./system/permission');
const basicRouter = require('./system/basic');

module.exports = (app) => {
  app.use('/auth', authRouter);

  app.use('/menu', menuRouter);

  app.use('/oss', ossRouter);

  app.use('/test', testRouter);

  app.use('/system/user', userRouter);
  app.use('/system/role', roleRouter);
  app.use('/system/permission', permissionRouter);
  app.use('/system/basic', basicRouter);
};