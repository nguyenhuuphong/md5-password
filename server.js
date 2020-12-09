// server.js
// where your node app starts
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const shortid = require("shortid");
var cookieParser = require('cookie-parser');
var db = require('./db');
var cookie = require('./middleware/count.middlewave');
var authMiddleware = require('./middleware/auth.middleware')
var md5 = require('md5');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser());
app.use(cookie.count);

app.set('view engine', 'pug');
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
// database
db.defaults({ books: [] }).write();
//
app.get('/', authMiddleware.requireAuth ,(req, res) => {
  res.render('home');
});

var bookRoute = require('./routers/book.router');
app.use('/books',authMiddleware.requireAuth, bookRoute);

var userRoute = require('./routers/users.router');
app.use("/user",authMiddleware.requireAuth, userRoute);

var transRoute = require('./routers/trans.router');
app.use('/transaction',authMiddleware.requireAuth, transRoute);

var authRoute = require('./routers/auth.router')
app.use('/auth', authRoute);
app.use(express.static('public')); 
/*
app.get("/books", (req, res) => {
  res.render( "index", {
    todo: db.get('books').value()
});
});  

app.get("/books/create",(req, res) => {
	res.render("create");
});
app.post("/books/create", (req, res) => {
  req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
  
    res.redirect("/books");
  
});
// xóa tên sách
app.get("/books/:id/delete", function(req, res) {
  var id = req.params.id;
   var getData =  db
    .get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books")
 
  });


// cập nhật tên sách
app.get("/books/:id/update", function(req, res) {
   var getId = req.params.id;
  var getData = db
    .get("books")
    .find({ id: getId })
    .value();
  res.render("update", {
    todo: getData
  });
});

app.post("/books/:id/update", (req, res) => {
  
  var id = req.params.id;
  var getTitle = req.body.title;
  var getDes  = req.body.des;
   
   db.get('books')
  .find({ id: id })
  .assign({ title: getTitle, des: getDes})
  .write()
  
  res.redirect("/books");
});
*/
