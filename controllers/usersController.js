const db = require("../db/queries");
const passport = require("../config/passport");

exports.usersPageGET = async function(req, res) {

  const users = await db.getAllUsers();

  res.render("users", { users: users });
};

exports.signUpPageGET = async function(req, res) {
  res.render("sign-up");
};

exports.registerUserPOST = async function(req, res) {

  const data = req.body;

  const firstName = data['first-name'];
  const lastName = data['last-name'];
  const username = data['username'];
  const email = data['email'];
  const password = data['password'];

  await db.addNewUser(firstName, lastName, username, email, password);
  res.redirect("/");
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