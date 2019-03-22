const authRouter = require('./auth');
const menuRouter = require('./menu');
const ossRouter = require('./oss');
const testRouter = require('./test');
const userRouter = require('./system/user');
const roleRouter = require('./system/role');
const permissionRouter = require('./system/permission');
const basicRouter = require('./system/basic');
const fileRouter = require('./system/file');
const versionRouter = require('./system/version');
const homeRouter = require('./home');
const companyRouter = require('./company');
const businessRouter = require('./business');

module.exports = (app) => {
  app.use('/auth', authRouter);

  app.use('/menu', menuRouter);

  app.use('/home', homeRouter);

  app.use('/company', companyRouter);

  app.use('/business', businessRouter);

  app.use('/system/user', userRouter);
  app.use('/system/role', roleRouter);
  app.use('/system/permission', permissionRouter);
  app.use('/system/basic', basicRouter);
  app.use('/system/file', fileRouter);
  app.use('/system/version', versionRouter);

  app.use('/oss', ossRouter);

  app.use('/test', testRouter);
};
