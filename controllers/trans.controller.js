var db = require("../db");
const shortid = require("shortid");
var cookieParser = require('cookie-parser');

module.exports.trans = function (req, res) {
	var trans = [];
	var users = db.get('user').value();
	var books = db.get('books').value();
	var result = [];
	
	var userLogin = db.get('user').find({ id: req.cookies.cookie}).value();
	// undefined

	if (!userLogin) {
		return res.send('User not found');
	}
    if (userLogin.isAdmin) {
    	trans = db.get('trans').value();
    } else {
    	trans = db.get('trans').filter({ userId: userLogin.id }).value();
    }


	trans.map(function(item){ // reduce 
		var obj = {};   
		obj.id = item.id;

		users.map(function(user){ // find
			if(item.userId === user.id){
				return obj.user = user;
			}
		});

		books.map(function(book){ // find
			if(item.bookId === book.id){
				return obj.book = book;
			}
		});
		obj.isComplete = item.isComplete
		return result.push(obj)
	});

console.log(result)
	res.render('trans', {
		transactions: result,
	})
};
// thêm userId và BookId mới
module.exports.create = function(req, res) {
	var users = db.get('user').value();
	var books = db.get('books').value();

 	res.render("transcreate", {
 		users: users,
 		books: books
 	});
};
module.exports.createPost = function(req, res){
	req.body.id = shortid.generate();
	// req.body: {
    //   "userId": "uIdx5Ji1q",
    //   "bookId": "YcGHF4uwC",
    //   "id": "k-meYJQmQ"
    // }
    // req.body.isComplete = false;
	db.get('trans').push(req.body).write();  
    res.redirect("/transaction");
};

module.exports.idCom = function (req, res ){
	var getId = req.params.id;
	var trans = db.get("trans").find({ id: getId }).value();

	if(!trans){
		return res.send("your id not found");
	}  
	
	res.render("transupdate", {
		trans: trans
	});
};
//code cũ
 /* var getId = req.params.id;
       var getData = db
        .get("trans")
        .find({ id: getId })
        .value();
    res.render("transupdate", {
            trans: getData
       });-->*/
module.exports.idComPost = function(req ,res){
  var id = req.params.id;
  var userId = req.body.userId;
  var bookId  = req.body.bookId;
  var isComplete= req.body.isComplete
   
   db.get('trans')
  .find({ id: id })
  .assign({ userId: userId, bookId: bookId,isComplete: isComplete })
  .write()
  
  res.redirect("/transaction");
};
