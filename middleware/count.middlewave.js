var express = require("express");
var db = require('../db');
const shortid = require("shortid");
var cookieParser = require('cookie-parser');

let count = 0 ;
module.exports.count = function (req , res, next){
	
    if(req.cookies.cookie){
         count++
    }
    //console.log(`${req.cookies.cookie}: ${count}`)
    //res.cookie('cookie', 1234); bài 14 express codeX
    next();
}

