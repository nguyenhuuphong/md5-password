var express = require("express");
var db = require('../db');
const shortid = require("shortid");

var router = express.Router();
var controller = require('../controllers/trans.controller');
// show người đã mượn sách
router.get("/", controller.trans);
// thêm userId và BookId mới
router.get("/create", controller.create);

router.post("/create", controller.createPost);

router.get("/:id/complete", controller.idCom);

router.post("/:id/complete", controller.idComPost);

module.exports = router;