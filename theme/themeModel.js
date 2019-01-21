var mongoose = require('mongoose');

var Schema = mongoose.Schema

var themeModel = new Schema({
    email:String,
    aside_color:String,
    header_color:String

});

module.exports = mongoose.model('theme', themeModel)