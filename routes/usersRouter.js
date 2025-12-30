const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

const passport = require("../config/passport");

usersRouter.get("/", usersController.usersPageGET);

usersRouter.route("/sign-up")
  .get(usersController.signUpPageGET)
  .post(usersController.registerUserPOST)
;

usersRouter.route("/log-in")
  .get(usersController.logInPageGET)
  .post(
    usersController.logUserInPOST,
    function (req, res) {
      res.redirect('/');
    }
  )
;

usersRouter.get("/log-out", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

usersRouter.post("/:userId/delete", usersController.deleteUserPOST);

module.exports = usersRouter;