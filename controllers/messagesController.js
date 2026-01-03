const db = require("../db/queries");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");

exports.messagesPageGET = async function(req, res) {
  res.render("messages", { 
    user: req.user,
    messages: await db.getAllMessages() 
  });
};