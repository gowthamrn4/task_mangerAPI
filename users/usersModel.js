var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var userModel=new Schema({
    username:String,
    email:String,
    password:String,
    role:String,
    status:Number
    });



module.exports=mongoose.model("alluser",userModel);