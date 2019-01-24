var mongoose = require('mongoose');

var Schema = mongoose.Schema

var subtaskModel = new Schema({
   taskName:String,
   subTaskName:String,
   inchargeName:String,
   createDate:String,
   description:String,
   taskTime:String,
   status:Number
});

module.exports = mongoose.model('subTask', subtaskModel)