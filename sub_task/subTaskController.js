var subTaskModel = require('./subTaskModel');
var app     = require('express');
var multer  = require('multer')
var fs = require('fs');
var upload = multer({ dest: './uploads/' })

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

var deleteAll = function(req,res){
    subTaskModel.deleteMany(function(err,result){
        if(!err){
            res.send(result)
        }
    })
}
var findallTask =function(req,res){
    subTaskModel.find(function(err,result){
        if(!err){
            res.send(result);
        }
    })
}
module.exports = {
  addSubTask:addSubTask,
  findSubTask:findSubTask,
  deleteAll:deleteAll,
  findallTask:findallTask
}