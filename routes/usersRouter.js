const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();
const { body, check } = require("express-validator");

const charErr = "must contain only letters.";
const lengthErr = "must be shorter than 15 characters.";
const notEmpty = "is required."

//an array of middleware that goes in a route
//remember routes can take arrays of middleware
const validateNewUser = [
  body('first-name')
    .optional()
    .trim()
    .isAlpha().withMessage(`First name ${charErr}`)
    .isLength({ max: 15 }).withMessage(`First name ${lengthErr}`),
  body('last-name')
    .optional()
    .trim()
    .isAlpha().withMessage(`Last name ${charErr}`)
    .isLength({ max: 15 }).withMessage(`Last name ${lengthErr}`),
  body('username')
    .trim()
    .notEmpty().withMessage(`Username ${notEmpty}`)
    .isAlphanumeric().withMessage(`Username must contain only letters and numbers.`)
    .isLength({ min: 3, max: 15 }).withMessage(`Username must be between 3 and 15 characters.`)
    .custom(async (username) => {
      const usernameExists = await usersController.usernameExists(username);
      
      if (usernameExists) {
        throw new Error("Username already taken.")
      }
      return true;
    }),
  body('email')
    .trim()
    .notEmpty().withMessage(`Email ${notEmpty}`)
    .isLength({ min: 3, max: 254 }).withMessage(`Email must be between 3 and 254 characters.`)
    .isEmail().withMessage(`Email must be a valid email address.`)
    .normalizeEmail(),
  body('password')
    .trim()
    .notEmpty().withMessage(`Password ${notEmpty}`)
    .isLength({ min: 8, max: 254 }).withMessage(`Password must be between 8 and 254 characters.`),
  body('confirm-password')
    .trim()
    .notEmpty().withMessage(`Please confirm password.`)
    .custom(function passwordsMatch(password, { req }) {
      if (password !== req.body.password) {
        throw new Error(`Passwords do not match.`);
      }
      return true;
    }),
  check('is-admin')
    .toBoolean()
];

const logInErrMsg = `Please enter a valid username.`;

const validateLogInUser = [
  body("username")
    .trim()
    .notEmpty().withMessage(`Please enter a username`)
    .isAlphanumeric().withMessage(`${logInErrMsg}`)
    .isLength({ min: 3, max: 15 }).withMessage(`${logInErrMsg}`)
];

const validateSecretPassword = [
  body("membership-password")
    .trim()
    .notEmpty().withMessage("Please enter a password.")
    .isAlphanumeric().withMessage("Only letters and numbers are valid characters.")
    .isLength({ min: 1, max: 255}).withMessage("Must be between 1 and 255 characters.")
];

usersRouter.get("/", usersController.usersPageGET);

usersRouter.route("/sign-up")
  .get(usersController.signUpPageGET)
  .post(
    validateNewUser,
    usersController.signUpPOST)
;

usersRouter.route("/log-in")
  .get(usersController.logInPageGET)
  .post(
    validateLogInUser,
    usersController.logUserInPOST
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

usersRouter.route("/membership")
  .get(usersController.membershipApplicationPageGET)
  .post(
    validateSecretPassword,
    usersController.applyForMembershipPOST
  )
;

module.exports = usersRouter;