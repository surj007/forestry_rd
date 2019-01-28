const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const redisStore = require('connect-redis')(expressSession);

const app = express();

require('./config/dbCfg');
require('./config/redisCfg');
require('./config/logCfg');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({
  secret: 'secret',
  cookie: {maxAge: 60 * 60 * 1000},
  resave: true, //每次访问以后，session的过期时间是否往后推迟
  saveUninitialized: false, //req.seesion.detory必需要这个false
  store: new redisStore({client: redisClient}),
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Cache-Control, Content-Type');
  next();
});

require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
