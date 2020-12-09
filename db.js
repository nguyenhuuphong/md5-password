const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);
const shortid = require("shortid");


db.defaults({ books: [] }, { user: [] }, { trans: [] }).write();

module.exports = db;