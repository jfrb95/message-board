const db = require("../db/queries");
const passport = require("../config/passport");
const bcrypt = require("bcryptjs");
const { validationResult, matchedData } = require("express-validator");

exports.usersPageGET = async function(req, res) {

  const users = await db.getAllUsers();

  res.render("users", { users: users });
};

exports.signUpPageGET = async function(req, res) {
  res.render("sign-up");
};

exports.signUpPOST = async function(req, res, next) {

  try {
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

      return res.status(400).render("sign-up", {
        errors,
      });
    }

    const data = matchedData(req);

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

exports.logUserInPOST = function(req, res, next) {

  try {

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

      return res.status(400).render("log-in", {
        errors,
      });
    };

    passport.authenticate("local", function(error, user, info) {
      if (error) { return next(error); }
      //if there is no such user in the database:
      if (!user) { return res.status(400).render("log-in", { noUserFound: info.message || 'Invalid credentials' }); }
    
      req.login(user, function(error) {
        if (error) {
          return next(error);
        }

        return res.redirect("/");
      });
    })(req, res, next);

  } catch {
    console.error(error);
    next(error);
  }
};

exports.usernameExists = async function(username) {
  const { rows } = await db.findUsername(username);
  const result = rows[0].exists;

  return result;
};