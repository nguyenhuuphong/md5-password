var express = require("express");
var db = require('../db');
const shortid = require("shortid");

module.exports.home = function (req, res){
  
  res.render( "index", {
    todo: db.get('books').value()
});
};  
// thêm tên sách
module.exports.create = function (req, res) {
	res.render("create");
};

module.exports.createPost =function (req, res){
  req.body.id = shortid.generate();
  var errors = []

  if (!req.body.title){
    errors.push("title is required")
  }
  if (!req.body.des){
    errors.push("Desciption is required")
  }
  if (errors.length){
     res.render("create",{
      errors: errors,
      values: req.body
     });
     return;
   }
    db.get('books').push(req.body).write();
    res.redirect("/books");
};
// xóa tên sách
module.exports.idDelete =  function(req, res) {
  var id = req.params.id;
   var getData =  db
    .get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books")
  };


// cập nhật tên sách
module.exports.idUpdate = function(req, res) {
   var getId = req.params.id;
  var getData = db
    .get("books")
    .find({ id: getId })
    .value();
  res.render("update", {
    todo: getData
  });
};

module.exports.idUpdatePost = function (req, res){
  
  var id = req.params.id;
  var Title = req.body.title;
  var Des  = req.body.des;
   
   db.get('books')
  .find({ id: id })
  .assign({ title:Title, des:Des})
  .write()
  
  res.redirect("/books");
};