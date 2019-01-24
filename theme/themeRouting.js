var express=require('express');
var themeController=require('./themeController');
var themeRouting=express.Router();

themeRouting.route('/changeTheme').post(themeController.addTheme);
themeRouting.route('/getTheme').post(themeController.findTheme);
themeRouting.route('/getall').get(themeController.getallTheme)
module.exports=themeRouting;