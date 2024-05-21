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


const mysql = require('mysql2');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Jcujcuj_2022',
  database: 'desarrolloWeb'
});

connection.connect(function(err){
    if(err){
      console.log('Error connecting: ' + err.stack);
      return;
    }
    console.log('Connected as id ' + connection.threadId);
  }
);

let queryCreateDB = 'CREATE DATABASE IF NOT EXISTS desarrolloWeb';
let queryCreateTableGoals = `CREATE TABLE IF NOT EXISTS goals (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL DEFAULT '',
  description VARCHAR(255) NOT NULL DEFAULT '',
  dueDate DATE NOT NULL,
  PRIMARY KEY (id)
);`;
let queryCreateTableTasks = `CREATE TABLE IF NOT EXISTS tasks (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL DEFAULT '',
  description VARCHAR(255) NOT NULL DEFAULT '',
  dueDate DATE NOT NULL,
  PRIMARY KEY (id)
);`;


connection.query(queryCreateDB, function(err, result, fields){
  if(err){
    console.log(err);
    return;
  }else{
  console.log(result);
  }
});

connection.query(queryCreateTableGoals, function(err, result, fields){
  if(err){
    console.log(err);
    return;
  }else{
  console.log(result);
  }
});

connection.query(queryCreateTableTasks, function(err, result, fields){
  if(err){
    console.log(err);
    return;
  }else{
  console.log(result);
  }
});

connection.destroy();

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