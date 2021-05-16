var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var i18n = require("i18n");
var mongoose = require('mongoose');
var passport = require('passport');
const session = require('express-session');
var bodyParser = require('body-parser');

//Middleware
const authMiddleware = require('./src/middlewares/auth');

var homeRouter = require('./src/routes/home');
var authRouter = require('./src/routes/auth');
var userRouter = require('./src/routes/users');
var notificationRouter = require('./src/routes/notification');

//admin
var adminRouter = require('./src/routes/admin');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'TONDUCTHANG'
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(i18n.init);
i18n.configure({
  locales: ['en', 'vi'],
  directory: __dirname + '/src/locales',
  cookie: 'lang',
  objectNotation: true
});

//Connect to mongoDB
mongoose.connect("mongodb://localhost:27017/tdt_social_media", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.log(error);
  console.log('Error connecting to database');
});
app.use('/admin', adminRouter);

//Auth
app.use('/auth', authRouter);

//Home
app.use('/', authMiddleware.isLogin, homeRouter);

//Profile
app.use('/user', authMiddleware.isLogin, userRouter);

//Admin home
app.use('/notification', notificationRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
