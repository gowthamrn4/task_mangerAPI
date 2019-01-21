var express=require('express');
var subTaskController=require('./subTaskController');
var subTaskRouting=express.Router();

subTaskRouting.route('/addTask').post(subTaskController.addSubTask);
subTaskRouting.route('/findTask').post(subTaskController.findSubTask);
module.exports=subTaskRouting;