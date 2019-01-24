var express=require('express');
var subTaskController=require('./subTaskController');
var subTaskRouting=express.Router();

subTaskRouting.route('/addTask').post(subTaskController.addSubTask);
subTaskRouting.route('/findTask').post(subTaskController.findSubTask);
subTaskRouting.route('/delete').delete(subTaskController.deleteAll);
subTaskRouting.route('/find').get(subTaskController.findallTask);

module.exports=subTaskRouting;