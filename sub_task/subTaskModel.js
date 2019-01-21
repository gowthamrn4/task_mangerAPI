var mongoose = require('mongoose');

var Schema = mongoose.Schema

var subtaskModel = new Schema({
   taskName:String,
   subTaskName:String,
   inchargeName:String,
   createDate:String,
   description:String,
});

module.exports = mongoose.model('subTask', subtaskModel)