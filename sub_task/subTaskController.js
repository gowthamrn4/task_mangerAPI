var subTaskModel = require('./subTaskModel');
var express     = require('express');


var addSubTask = function(req,res){
    var subTask = new subTaskModel(req.body);
    var taskName = req.body.taskName;
    subTask.save(function(err,result){
       if(err){
           res.send('cannot add sub task .....');
       }else{
           subTaskModel.find({taskName},function(err,result){
               if(err){
                   res.send('cannot find...');
               }else{
                   res.send(result)
               }
           })
       }
    })
}


var findSubTask = function(req,res){
    var taskName = req.body.taskName;
    console.log(taskName)
    subTaskModel.find({taskName},function(err,result){
        if(err){
            res.send('cannot find');
        }else{
            res.send(result);
        }
    })
}

module.exports = {
  addSubTask:addSubTask,
  findSubTask:findSubTask
}