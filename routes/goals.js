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

let goals = [];

router.get('/getGoals', function(req, res, next) {
    let queryGetGoals = 'SELECT * FROM goals';
    connection.query(queryGetGoals, function(err, result, fields){
        if(err){
          res.status(500).json(err);
        }else{
        res.status(200).json(result);
        }
      });
});

router.post('/addGoal', function(req, res, next) {
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        let queryCreateGoal = 'INSERT INTO goals (name, description, dueDate) VALUES ("'+req.body.name+'","'+req.body.description+'","'+req.body.dueDate+'")';
        connection.query(queryCreateGoal, function(err, result, fields){
            if(err){
              res.status(500).json(err);
            }else{
            res.status(200).json(result);
            }
          });
    }
});

router.delete('/removeGoal/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        let id = req.params.id;
        let queryDeleteGoal = 'DELETE FROM goals WHERE id = '+id;
        connection.query(queryDeleteGoal, function(err, result, fields){
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