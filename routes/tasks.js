var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://rahul:Skyfall007@ds117422.mlab.com:17422/details', ['tasks']);

//Get all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

//Get single tasks
router.get('/task/:id', function(req, res, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Save Task - POST
router.post('/task', function(req, res, next){
    var task = req.body;
    var data = {
        email: task.email,
        password: task.password
    }
    // if(!task.title || (task.isDone + '')){
    //     res.status(400);
    //     res.json({
    //         "error": "Bad data"
    //     });
    // } else {
        
    // }
    db.tasks.save(data, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
});

//Delete Task
router.delete('/task/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

//Update task
router.put('/task/:id', function(req, res, next){
    var task = req.body;
    var updTask = {

    };
    var updated = {
        email: task.email,
        password: task.password
    };

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status (400);
        res.json({
            "error":"bad data"
        });
    } else { 
            db.tasks.update({_id: mongojs.ObjectId(req.params.id)},updated, {},  function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
    }
});


module.exports = router;