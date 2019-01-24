const userprofileModel = require('./userprofileModel');
const subTaskModel = require('../sub_task/subTaskModel');

var createUserTask = function(req,res){
    var newUserTask = new userprofileModel(req.body);
    var email = req.body.email;
    console.log(email)
    userprofileModel.findOne({email},function(err,result){
        if(result==null){
            // subTaskModel.find(function(err,Result){
            //     if(!err){
            //         console.log("my"+Result)
            //        newUserTask.save(function(err,result){
            //            if(!err){
            //               newUserTask.update({$push:{task:Result}},function(err,result){
            //                   if(!err){
            //                       res.send(result)
            //                   }
            //               })
            //            }
            //        })
            //     }
            //   })
            newUserTask.save(function(err,result){
                if(!err){
                    subTaskModel.find(function(err,Result){
                        if(!err)
                      {
                        newUserTask.update({$push:{task:Result}},function(err,result){
                            if(!err){
                                res.send(result)
                            }
                        })
                      }
                    })
                }
            })
        }else{
           subTaskModel.find(function(err,Myresult){
               if(!err){
                   userprofileModel.update({email},{$addToSet:{task:Myresult}},function(err,result){
                       if(!err){
                           res.send(result)
                       }
                   })
               }
           })
        }
    })
}

var getall = function(req,res){
    userprofileModel.find(function(err,result){
        if(!err){
            res.send(result);
        }
    })
}

var deleteAll = function(req,res){
    userprofileModel.deleteMany(function(err,result){
        if(!err){
            res.send(result)
        }
    })
}

var finduserTask = function(req,res){
    var email = req.body.email;
    var taskName = req.body.taskName;
    console.log(taskName)
    userprofileModel.find({email},function(err,result){
        if(!err){
            res.send(result)
        }
    })
}

var activeTask = function(req,res){
    var email = req.body.email;
    var _id = req.body._id;
    var status = 0;
    console.log(_id)
    userprofileModel.find({},function(err,result){
     if(!err){
         res.send(result);
     }
    })
}
module.exports = {
    createUserTask:createUserTask,
    getall:getall,
    deleteAll:deleteAll,
    finduserTask:finduserTask,
    activeTask:activeTask
}