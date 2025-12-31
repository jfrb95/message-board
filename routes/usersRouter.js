const { Router } = require("express");
const usersController = require("../controllers/usersController");
const usersRouter = Router();
const { body, validationResult, matchedData } = require("express-validator");

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
    .equals(body('password')).withMessage(`Passwords do not match`)
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