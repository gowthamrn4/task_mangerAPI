var User=require('./usersModel');

var express     = require('express');

var app         = express();

var jwt    = require('jsonwebtoken');

var config = require('../config');

app.set('superSecret', config.secret);


var adduser=function (req,res){
    var token = req.headers['x-access-token'];
    var rollno =req.body.rollno;
    var role = req.body.role;
    console.log(rollno)         
                var id={
                    email:req.body.email,
                }
                User.findOne(id,function(err,result){
                    console.log(result);
                    if(result===null){
                        var user=new User(req.body);
                        if(role ==="student"){
                            user.rollno= rollno;
                            console.log(user.rollno)
                        }
                        user.save(function(err){
                            if(err){
                                res.send('cannot reqister')
                            }else{
                                var data={
                                    message:'User added successfully',
                                    user:user
                                } 
                                
                                return res.send(data)

                              
                            }
                            
                        });
                    }else if(result.email===id.email){
                        var data={
                            message:'Existing User'
                        }
                        return res.send(data)
                    }
                })
           

}

var deleteuser = function(req,res){
    var token = req.headers['x-access-token'];
    var _id = req.body._id;
    var role = req.body.role;
    if(token){
        jwt.verify(token,app.get('superSecret'),function(err,decoded){
            if(err){
                return res.json({success:false,message:'Faild To Find User'});
            }else{
                User.findByIdAndRemove({_id}, function(err, result) {
                    if (err){
                        return res.send("err");
                    } 
                    else {
                        User.find({role},function(err,finduser){
                         if (err) return res.send("err");
                         else return res.send(finduser);
                        })
                    }
                })
            }
        });
    }else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

 
    };
}

var finduser=function(req,res){
    var token = req.headers['x-access-token'];
    var role = req.body.role;
    if(token){
        jwt.verify(token,app.get('superSecret'),function(err,decoded){
            if(err){
                return res.json({success:false,message:'Faild To Find User'});
            }else{
                User.find({role}, function(err, result) {
                    if (err) return res.send("err");
                    else return res.send(result);
                })
            }
        });
    }else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

 
    };
}
var getusers=function(req,res){
    var token = req.headers['x-access-token'];
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });    
          } else {
            // if everything is good, save to request for use in other routes
            // req.decoded = decoded;    
            // next();
           User.find(function(err,users){
           console.log(users)
           res.send(users);
                         })
          }
        });
    
      } else {
    
        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

 
    };
}

var login=function(req,res){
      

    // find the user
    User.findOne({
         email: req.body.email
      }, function(err, user) {
        if (err) {
            message:"login faild"
        }
    
        if (!user) {
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else if (user) {
    
          // check if password matches
          if (user.password != req.body.password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
    
            // if user is found and password is right
            // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          id:user.id,
          email:user.email,
         
        };
        console.log(payload);
            var token = jwt.sign(payload, app.get('superSecret'),{
            // expiresIn: 1440 // expires in 24 hours
           
            });
            console.log(token);
            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
              user:user
            }).status(200);
          }   
    
        }
    
      });
  }
  module.exports={
    getusers:getusers,
    adduser:adduser,
    login:login,
    finduser:finduser,
    deleteuser:deleteuser
}