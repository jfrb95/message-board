const db = require("../db/queries");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");


exports.messagesPageGET = async function(req, res) {
  res.render("messages", { 
    user: req.user,
    messages: await db.getAllMessages() 
  });
};

exports.newMessagePOST = async function(req, res) {

  const result = validationResult(req);

  if (!result.isEmpty()) {
    const errors = {};

    result.errors.forEach(error => {
      if (!errors.hasOwnProperty(error.path)) {
        errors[error.path] = [error.msg];
      } else {
        errors[error.path].push(error.msg);
      };
    });

    return res.status(400).render("messages", {
      errors,
      user: req.user,
      messages: await db.getAllMessages(),
    });
  };

  req.matchedData = matchedData(req);

  await db.addNewMessage("nice", "nice", "nice", "nice");
  res.redirect("/messages");
};