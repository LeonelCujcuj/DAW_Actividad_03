var express = require('express');
var router = express.Router();

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
    let timestamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timestamp.toString();
        goals.push(req.body);
        res.status(200).json(tasks);
    }
    res.status(400).json({error: 'No se pudo agregar la meta. Por favor, verifica los datos ingresados.'});
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