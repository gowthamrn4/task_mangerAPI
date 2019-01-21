var mongoose = require('mongoose');

var Schema = mongoose.Schema

var messageModel = new Schema({
    username:String,
    email: String,
    usernameTo:String,
    emailTo:String,
    message: [{
       text:String,
       msgTime:String
    }]

});

module.exports = mongoose.model('message', messageModel)