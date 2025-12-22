require("dotenv").config();
const express = require("express");
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require("./config/passport");
const LocalStrategy = require('passport-local').Strategy;
const app = express();

const messagesRouter = require("./routes/messagesRouter");
const usersRouter = require("./routes/usersRouter");

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({
  secret: `
    secret
    Required option

    This is the secret used to sign the session ID cookie.The secret can be any type of value that is supported by Node.js crypto.createHmac(like a string or a Buffer).This can be either a single secret, or an array of multiple secrets.If an array of secrets is provided, only the first element will be used to sign the session ID cookie, while all the elements will be considered when verifying the signature in requests.The secret itself should be not easily parsed by a human and would best be a random set of characters.A best practice may include:

        The use of environment variables to store the secret, ensuring the secret itself does not exist in your repository.
    Periodic updates of the secret, while ensuring the previous secret is in the array.
    Using a secret that cannot be guessed will reduce the ability to hijack a session to only guessing the session ID(as determined by the genid option).

    Changing the secret value will invalidate all existing sessions.In order to rotate the secret without invalidating sessions, provide an array of secrets, with the new secret as first element of the array, and including previous secrets as the later elements.

    Note HMAC- 256 is used to sign the session ID.For this reason, the secret should contain at least 32 bytes of entropy.
    `,
  resave: false,
  saveUninitialized: false
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: true }));

app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

app.locals.links = [
  { href: "/", text: "Home" },
  { href: "/messages", text: "Messages" },
  { href: "/users", text: "Users" },
];

app.get("/", function(req, res) {
  res.render("index", { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Message board app listening on port ${PORT}!`);
});