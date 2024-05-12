var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
var cors = require('cors'); // importar cors

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var tasksRouter = require('./routes/tasks'); // importar la ruta de tasks
var goalsRouter = require('./routes/goals'); // importar la ruta de goals

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(cors()); // usar cors
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// middleware
router.use((req, res, next) => {
  if(req.headers.authorization && req.headers.authorization === '123456'){
    next();
  }else{
    res.status(401).json({'error': 'No se encuentra autorizado'});
  }
  });

app.use('/', router); // middleware
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter); // usar la ruta de tasks
app.use('/goals', goalsRouter); // usar la ruta de goals

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
