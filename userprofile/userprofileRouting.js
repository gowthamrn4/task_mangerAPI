var express=require('express');
var userprofileController=require('./userprofileController');
var userprofileRouting=express.Router();

userprofileRouting.route('/addusertask').post(userprofileController.createUserTask);
userprofileRouting.route('/getalltask').get(userprofileController.getall);
userprofileRouting.route('/delete').delete(userprofileController.deleteAll);
userprofileRouting.route('/findtask').post(userprofileController.finduserTask);
userprofileRouting.route('/active').post(userprofileController.activeTask)
module.exports=userprofileRouting;