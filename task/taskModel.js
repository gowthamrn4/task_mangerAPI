var mongoose = require('mongoose');

var Schema = mongoose.Schema

var taskModel = new Schema({
    taskName:String,
    inchargeName:String,
    theme:String

});

module.exports = mongoose.model('task', taskModel)