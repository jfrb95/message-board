require("dotenv").config();
const express = require("express");
const app = express();
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");

const messagesRouter = require("./routes/messagesRouter");
const usersRouter = require("./routes/usersRouter");

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/messages", messagesRouter);
app.use("/users", usersRouter);

app.locals.links = [
  { href: "/", text: "Home" },
  { href: "/messages", text: "Messages" },
  { href: "/users", text: "Users" },
];

app.get("/", function(req, res) {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Message board app listening on port ${PORT}!`);
});