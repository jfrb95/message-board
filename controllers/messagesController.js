const db = require("../db/queries");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");

const dateFormatter = new Intl.DateTimeFormat(undefined, { 
  dateStyle: 'medium',
  timeStyle: 'short'
});

exports.messagesPageGET = async function(req, res) {

  const messages = await db.getAllMessages();

  res.render("messages", { 
    user: req.user,
    messages,
    dateFormatter
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

  const data = matchedData(req);

  await db.addNewMessage(data["message-title"], new Date(Date.now()), data["message-text"], req.user.id);
  res.redirect("/messages");
};