var express=require('express');

var usersController=require('./usersController');

var usersRouting=express.Router();

usersRouting.route('/getusers').get(usersController.getusers);
usersRouting.route('/adduser').post(usersController.adduser);
usersRouting.route('/login').post(usersController.login);
usersRouting.route('/finduser').post(usersController.finduser)
usersRouting.route('/delusers').post(usersController.deleteuser)

module.exports=usersRouting;