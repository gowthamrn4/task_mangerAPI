var themeModel = require('./themeModel');
var express     = require('express');

var addTheme = function(req,res){
    var email = req.body.email;
    var aside_color = req.body.aside_color;
    var header_color= req.body.header_color;
    themeModel.findOne({email},function(err,result){
        if(!err){
            if(result==null){
                var newTheme = new themeModel(req.body);
                newTheme.save(function(err,result){
                    if(err){
                        res.send('cannot add');
                    }else{
                        themeModel.find({email},function(err,result){
                            if(err){
                                res.send('cannot get');
                            }else{
                               res.send(result);
                            }
                        })
                    }
                })
            }else{
               themeModel.findOneAndUpdate({email},{aside_color,header_color},function(err,result){
                   if(err){
                       res.send('cannot change theme');
                   }else{
                       res.send(result);
                   }
               })
            }
        }
    })
}

var findTheme = function(req,res){
    var email = req.body.email;
    themeModel.find({email},function(err,result){
        if(err){
            res.send('cannot get');
        }else{
           res.send(result);
        }
    })
}

var getallTheme = function(req,res){
    themeModel.find(function(err,result){
        if(!err){
            res.send(result)
        }
    })
}
module.exports = {
    addTheme:addTheme,
    findTheme:findTheme,
    getallTheme:getallTheme
}