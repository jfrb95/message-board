const db = require("../db/queries");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");

exports.messagesPageGET = async function(req, res) {
  res.render("messages", { 
    user: req.user,
    messages: await db.getAllMessages() 
  });
};

exports.newMessagePOST = async function(req, res) {
  await db.addNewMessage("nice", "nice", "nice", "nice");
  res.redirect("/messages");
};