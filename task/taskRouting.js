var express=require('express');
var taskController=require('./taskController');
var taskRouting=express.Router();

taskRouting.route('/addTask').post(taskController.createTask);
taskRouting.route('/getTask').get(taskController.getAllTask);
taskRouting.route('/delTask').post(taskController.deleteTask);
module.exports=taskRouting;