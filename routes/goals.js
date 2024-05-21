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

let goals = [
    {
        id: '2',
        name: 'Meta 1',
        description: 'Descripción de la meta 1 desde el Backend',
        dueDate: '2024-12-31'
    }
];

router.get('/getGoals', function(req, res, next) {
    res.json(goals);
});

router.post('/addGoal', function(req, res, next) {
   // let timestamp = Date.now() + Math.random();
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
    //res.status(400).json({error: 'No se pudo agregar la meta. Por favor, verifica los datos ingresados.'});
});

router.delete('/removeGoal/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        let id = req.params.id;
        goals = goals.filter(goal => goal.id !== id);
        res.json(goals);
    }else{
        res.json([{}]);
    }
});

module.exports = router;