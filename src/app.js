const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);

const { permissionAuth } = require('./middleware/permissionAuth');
const { setRequestId } = require('./middleware/setRequestId');
const CommonDto = require('./dto/commonDto.class');

const app = express();
const commonDto = new CommonDto();

require('./config/dbCfg');
require('./config/redisCfg');
require('./config/validateCfg');
require('./config/logCfg');

require('./rpc/testRpcService/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  cookie: {
    // 在这块可以设置cookie的相关属性，如domain、httponly等
    // store中存储数据会根据这个时间自动进行老化 
    maxAge: 24 * 60 * 60 * 1000
  },
  // 手动生成sessionid
  // genid: function (req) {
  //   return genuuid();
  // },
  // cookie名称，默认为connect.sid
  // name: 'connect.sid',
  // 每次访问以后，session的过期时间是否往后推迟，现在改成在后面的中间件中推迟过期时间
  resave: false,
  // 无论有没有session cookie，每次请求都设置个session cookie，默认给个标示为connect.sid，一定是false
  saveUninitialized: false,
  store: new redisStore({ client: redisClient }),
}));

app.use('/public', express.static(path.join(__dirname, 'public')));

// http重定向到https
// app.all('*', (req, res) => {
//   let host = req.headers.host;
//   // Remove port number
//   host = host.replace(/\:\d+$/, '');
//   // 307 内部重定向
//   res.redirect(307, `https://${host}${req.path}`);
// });

/*
  加了这个以后没法显示404。
  可以考虑在每个接口（或者每个子路由中加小中间件）中进行权限校验（现在是统一中间件校验）：{
    function permissionAuth(needPermission) {
      return function (req, res, next) {
        if (req.session.permission.includes(needPermission)) { next(); }
        else {
          res.statue(403);
        }
      }
    }

    router.post(
      '/login',
      permissionAuth('flow_template_w')
      async (req, res, next) => { }
    );
  }
  或者需要把所有路径注册下，前置中间件没找到返回404
*/
// 除了这种统一根据url中的模块校验权限以外，还可以将每个url对应的权限进行注册，在一个中间进行校验
// 没有进入app.get的请求不会发给cookie
app.use(permissionAuth);
app.use(setRequestId);
// 用于更新浏览器cookie过期时间
app.use((req, res, next) => {
  if (req.session.userInfo) {
    req.session._garbage = Date();
    req.session.touch();
  }

  next();
});
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type, x-auth-token');
  next();
});

require('./routes')(app);

app.use((req, res, next) => {
  // 所有没有被上述路由捕获的请求，会走到这个中间件，向下面的中间件传一个404
  // 有这个中间件才能抛出错误，下面的中间件才能接到
  next(createError(404));
});
// 也可以直接这样
// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!");
// });

// 捕获所有错误
app.use((err, req, res, next) => {
  if(err.name === 'NotFoundError') {
    res.status(404).json(commonDto.serverErrRespond(err));
  }
  else {
    logger.error(err);
    
    res.status(500).json(commonDto.serverErrRespond(err));
  }
});

module.exports = app;
