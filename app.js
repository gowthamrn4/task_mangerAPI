const express = require('express');
const jwt =require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var morgan      = require('morgan');
var path = require("path");



// var app = express();
// var db = mongoose.connect("mongodb://localhost:27017/schoolApp",{ useNewUrlParser: true });
 var db = mongoose.connect("mongodb://gowthamrn:Gowthamrn4@ds253324.mlab.com:53324/task_manager",{ useNewUrlParser: true });

const mongodb = require('mongodb');
var config = require('./config');
const app = express()

app.set('superSecret', config.secret);





process.env.PWD = process.cwd();

app.set('views', path.join(process.env.PWD, 'public'));

app.use('/swagger',express.static(path.join(process.env.PWD, 'public')));

  
    // const db = mongoose.connect("mongodb://localhost:27017/schoolApp")

const usersRouting = require('./users/usersRouting');




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
var port = process.env.PORT || (3000);

app.listen(port, () => console.log(`Running on localhost:3000`));