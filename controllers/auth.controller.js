var md5 = require('md5');
var express = require("express");
var bcrypt = require('bcrypt');
var db = require('../db');
const shortid = require("shortid");
var cookieParser = require('cookie-parser');


module.exports.login = function (req, res) {
  res.render("login");
};

module.exports.postLogin = async function (req, res, next){
	var email = req.body.email ;
	var password = req.body.password;

	var user = db.get('user').find({email: email}).value();

	if(!user){
		res.resder('login', {
			errors: [
                'email không tồn tại ...-_-'
			],
			values: req.body
		})
		return;
	}

	if (user.wrong >= 4) {
		return res.render('login', {
			errors: [`Bạn đã đăng nhập sai ${user.wrong} lần, vui lòng liên vệ với admin để khôi phục tài khoản`]
		})
	}
 
	// theem md5 để tăng độ bảo mật
	var isMathPassword = await bcrypt.compare(password, user.password)
	
	if (!isMathPassword){
       	db.get('user').find({ email: email }).assign({ wrong: user.wrong + 1 }).write();
		
		return res.render('login',{
			errors: ['sai mật khẩu']
		})
	}	

	if (user.wrong > 0) {
		db.get('user').find({ email: email }).assign({ wrong: 0 }).write();
	}

	res.cookie('cookie', user.id);
	res.redirect('/');
}