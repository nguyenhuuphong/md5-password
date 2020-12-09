var express = require("express");
var router = express.Router();
const shortid = require("shortid");
const bcrypt = require('bcrypt');
var db = require('../db');

var controller = require('../controllers/auth.controller');
// view home user
router.get("/login", controller.login );

router.post("/login", controller.postLogin);

router.get('/test', async function(req,res) {
	const password = 'nguyenhuuphong';
	const saltRounds = 10;
	const hash = await bcrypt.hash(password, saltRounds);

	// luu hash vao db
	console.log(password, hash)
});



module.exports = router;