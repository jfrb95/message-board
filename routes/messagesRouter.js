const { Router } = require("express");
const messagesController = require("../controllers/messagesController");
const { body, validationResult, matchedData } = require("express-validator");

const messagesRouter = Router();

const validateMessage = [
  body("message-text")
    .trim()
    .notEmpty().withMessage("Message must not be empty.")
    .isLength({ min: 1, max: 255 }).withMessage("Message must be between 1 and 255 characters.")
];

messagesRouter.get("/", messagesController.messagesPageGET);

messagesRouter.post("/new", 
  validateMessage,
  messagesController.newMessagePOST
);

module.exports = messagesRouter;