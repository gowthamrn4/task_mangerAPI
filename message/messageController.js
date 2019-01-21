var messageModel = require('./messageModel');
var express     = require('express');
var app         = express();
var dateTime = require('node-datetime');
var dt = dateTime.create();
var Time = dt.format('Y-m-d H:M:S');
var http = require('http').Server(app);
var io = require('socket.io')(http);

var createMessage = function(req,res){
    var sendmessage = new messageModel(req.body);
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    var text = req.body.message;
    console.log(text);
    var NewMessage = new messageModel(req.body);
    messageModel.findOne({email},function(err,result){
        if(result==null){
            NewMessage.save(function(err, result) {
             if (err) return res.send('cannot add')
             else {
                var email = req.body.emailTo;
                var emailTo = req.body.email;
                console.log(email);
                console.log(emailTo)
                messageModel.findOne({email},function(err,result9){
                    if(result9==null){
                        NewMessage.save(function(err,result10){
                            if(!err){
                                res.send(result10);
                            }
                        })
                    }
                })
             }
         })
        }else{
            messageModel.update({email,emailTo},{$push:{message:text}},function(err,result){
                if(err){
                   var email = req.body.emailTo;
                   var emailTo = req.body.email;
                   var NewMessage = new messageModel(req.body);
                   messageModel.findOne({email,emailTo},function(err,result6){
                    if(err){
                        res.send('cannot update');
                        console.log('cannot add')
                    }else{
                        res.send(result6)
                    }
                   })
                }else{
                    res.send(result);
                }
            })
        }
     }) 
}

var findUserMessage = function(req,res){
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    messageModel.find({email,emailTo},function(err,result){
        if(err){
            res.send('cannot find');
        }else{
            res.send(result);
       }
    })
}
var findFromMessage = function(req,res){
    var email = req.body.email;
    var emailTo = req.body.emailTo;
    messageModel.find({email,emailTo},function(err,result){
        if(err){
            res.send('cannot find');
        }else{
            res.send(result);  
        }
    })
}
module.exports={
    createMessage:createMessage,
    findUserMessage:findUserMessage,
    findFromMessage:findFromMessage
}