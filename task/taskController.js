var taskModel = require('./taskModel');
var express     = require('express');


/* create new task... */
var createTask  = function(req,res){
    var newTask = new taskModel(req.body);
    newTask.save(function(err,result){
       if(err){
           res.send('cannot add ');
       } else{
           taskModel.find(function(err,result){
               if(!err){
                   res.send(result)
               }
           })
       }
    })
}
/* end create new task... */

/* get all task */
 
var getAllTask = function(req,res){
    taskModel.find(function(err,result){
        if(err){
            res.send('cannot find from this collection....')
        }
        else{
            res.send(result);
        }
    })
}

/* end get alltask */


/* delete task by findbyid */

var deleteTask = function(req,res){
    var _id = req.body._id;
    taskModel.findByIdAndDelete({_id},function(err,result){
        if(err){
            res.send('cannot delete')
        }else{
           taskModel.find(function(err,result){
               if(err){
                   res.send('cannot find after delete');
               }else{
                   res.send(result);
               }
           })
        }
    })
}

/* end delete  task by findbyid */
module.exports = {
    createTask:createTask,
    getAllTask:getAllTask,
    deleteTask:deleteTask
}