const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();

usersRouter.get("/", usersController.usersPageGET);

usersRouter.route("/sign-up")
  .get(usersController.signUpPageGET)
  .post(usersController.registerUserPOST)
;

usersRouter.route("/log-in")
  .get(usersController.logInPageGET)
  .post(usersController.logUserInPOST)
;

usersRouter.post("/:userId/delete", usersController.deleteUserPOST);

module.exports = usersRouter;