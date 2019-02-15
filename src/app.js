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
require('./config/logCfg');
require('./rpc/testRpcService/index');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  cookie: {maxAge: 60 * 60 * 1000},
  resave: true, //每次访问以后，session的过期时间是否往后推迟
  saveUninitialized: false, //无论有没有session cookie，每次请求都设置个session cookie，默认给个标示为 connect.sid，一定是false
  store: new redisStore({client: redisClient}),
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(permissionAuth);
app.use(setRequestId);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type');
  next();
});

require('./routes')(app);

app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.status(500).json(commonDto.serverErrRespond(err));
  logger.error(err);
});

module.exports = app;
