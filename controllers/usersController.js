const db = require("../db/queries");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");

exports.usersPageGET = async function(req, res) {

  const users = await db.getAllUsers();

  res.render("users", { users: users });
};

exports.signUpPageGET = async function(req, res) {
  res.render("sign-up");
};

exports.signUpPOST = async function(req, res, next) {

  try {

    const data = req.body;

    const firstName = data['first-name'];
    const lastName = data['last-name'];
    const username = data['username'];
    const email = data['email'];
    const hashedPassword = await bcrypt.hash(data['password'], 10);

    await db.addNewUser(firstName, lastName, username, email, hashedPassword);
    res.redirect("/");

  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteUserPOST = async function(req, res) {
  
  await db.deleteUser(req.params.userId);

  res.redirect("/users");
};

exports.logInPageGET = async function(req, res) {
  res.render("log-in");
};

exports.logUserInPOST = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/"
});