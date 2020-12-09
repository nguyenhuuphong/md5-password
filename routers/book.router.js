var express = require("express");
var db = require('../db');
const shortid = require("shortid");
const app = express();
var router = express.Router();
var controller = require('../controllers/books.controller');

router.get("/", controller.home );
// thêm tên sách
router.get("/create", controller.create);

router.post("/create", controller.createPost);
// xóa tên sách
router.get("/:id/delete",  controller.idDelete );


// cập nhật tên sách
router.get("/:id/update", controller.idUpdate);

router.post("/:id/update", controller.idUpdatePost);

module.exports = router;
/*router.get("/", (req, res) => {
  res.render( "index", {
    todo: db.get('books').value()
});
});  
// thêm tên sách
router.get("/create",(req, res) => {
	res.render("create");
});

router.post("/create", (req, res) => {
  req.body.id = shortid.generate();
    db.get('books').push(req.body).write();
  
    res.redirect("/books");
  
});
// xóa tên sách
router.get("/:id/delete", function(req, res) {
  var id = req.params.id;
   var getData =  db
    .get("books")
    .remove({ id: id })
    .write();
  res.redirect("/books")
  });


// cập nhật tên sách
router.get("/:id/update", function(req, res) {
   var getId = req.params.id;
  var getData = db
    .get("books")
    .find({ id: getId })
    .value();
  res.render("update", {
    todo: getData
  });
});

router.post("/:id/update", (req, res) => {
  
  var id = req.params.id;
  var Title = req.body.title;
  var Des  = req.body.des;
   
   db.get('books')
  .find({ id: id })
  .assign({ title:Title, des:Des})
  .write()
  
  res.redirect("/books");
});


*/
