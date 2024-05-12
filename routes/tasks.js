var express = require('express');
var router = express.Router();

let tasks = [
    {
        id: '1',
        name: 'Tarea 1',
        description: 'Descripción de la tarea 1 desde el Backend',
        dueDate: '2024-05-09'
    }
];

router.get('/getTasks', function(req, res, next) {
    res.json(tasks);
});

router.post('/addTask', function(req, res, next) {
    let timestamp = Date.now() + Math.random();
    if (req.body && req.body.name && req.body.description && req.body.dueDate) {
        req.body.id = timestamp.toString();
        tasks.push(req.body);
        res.status(200).json(tasks);
    }
    res.status(400).json({error: 'No se pudo agregar la tarea. Por favor, verifica los datos ingresados.'});
});

router.delete('/removeTask/:id', function(req, res, next) {
    if (req.params && req.params.id) {
        let id = req.params.id;
        tasks = tasks.filter(task => task.id !== id);
        res.json(tasks);
    }else{
        res.json([{}]);
    }
});

module.exports = router;