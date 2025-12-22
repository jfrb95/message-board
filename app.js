require("dotend").config();
const express = require("express");
const app = express();
const path = require("node:path");
const expressLayouts = require("express-ejs-layouts");

const messagesRouter = require("./routes/messagesRouter");