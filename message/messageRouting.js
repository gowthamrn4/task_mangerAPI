var express=require('express');
var messageController=require('./messageController');
var messageRouting=express.Router();

messageRouting.route('/sendMessage').post(messageController.createMessage);
messageRouting.route('/getUsermesg').post(messageController.findUserMessage);
messageRouting.route('/getFrommesg').post(messageController.findFromMessage);
module.exports=messageRouting;