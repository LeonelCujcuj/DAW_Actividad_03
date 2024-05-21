var express = require('express');
var router = express.Router();
var mysql = require('mysql2');

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

let tasks = [];

router.get('/getTasks', function(req, res, next) {
    let queryGetTasks = 'SELECT * FROM tasks';
    connection.query(queryGetTasks, function(err, result, fields){
        if(err){
          res.status(500).json(err);
        }else{
        res.status(200).json(result);
        }
      });
});

router.post('/addTask', function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        let queryCreateTask = 'INSERT INTO tasks (name, description, dueDate) VALUES ("'+req.body.name+'","'+req.body.description+'","'+req.body.dueDate+'")';
        connection.query(queryCreateTask, function(err, result, fields){
            if(err){
              res.status(500).json(err);
            }else{
            res.status(200).json(result);
            }
          });
    }
});

router.delete('/removeTask/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        let id = req.params.id;
        let queryDeleteTask = 'DELETE FROM tasks WHERE id = '+id;
        connection.query(queryDeleteTask, function(err, result, fields){
            if(err){
              res.status(500).json(err);
            }else{
            res.status(200).json(result);
            }
          });
    }else{
        res.json([{}]);
    }
});

module.exports = router;