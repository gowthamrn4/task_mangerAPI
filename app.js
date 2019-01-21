const express = require('express');
const jwt =require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var morgan      = require('morgan');
var path = require("path");
let app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//  var db = mongoose.connect("mongodb://localhost:27017/taskManager",{ useNewUrlParser: true });
 var db = mongoose.connect("mongodb://gowthamrn:Gowthamrn4@ds253324.mlab.com:53324/task_manager",{ useNewUrlParser: true });

const mongodb = require('mongodb');
var config = require('./config');

app.set('superSecret', config.secret);


app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
});


process.env.PWD = process.cwd();

app.set('views', path.join(process.env.PWD, 'public'));

app.use('/swagger',express.static(path.join(process.env.PWD, 'public')));

  
    // const db = mongoose.connect("mongodb://localhost:27017/schoolApp")

const usersRouting = require('./users/usersRouting');
const messageRouting = require('./message/messageRouting');
const taskRouting = require('./task/taskRouting');
const themeRouting = require('./theme/themeRouting');
const subTaskRouting = require('./sub_task/subTaskRouting');

app.set('json spaces', 40);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,application/json, Accept,x-access-token");
    next();
});


app.use('/users',usersRouting);
app.use('/message',messageRouting);
app.use('/task',taskRouting);
app.use('/theme',themeRouting);
app.use('/sub_task',subTaskRouting);
var port = process.env.PORT || (3000);

app.listen(port, () => console.log(`Running on localhost:3000`));

app.use(express.static('public'));


