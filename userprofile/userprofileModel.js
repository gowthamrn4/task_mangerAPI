var mongoose = require('mongoose');

var Schema = mongoose.Schema

var profileModel = new Schema({
   username:String,
   email:String,
   task:[{
    taskName:String,
    subTaskName:String,
    inchargeName:String,
    createDate:String,
    description:String,
    taskTime:String,
    status:Number
   }]

});

module.exports = mongoose.model('profile', profileModel)