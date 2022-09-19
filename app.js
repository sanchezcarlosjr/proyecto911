"use strict";

/**
 * Module dependencies.
 */

const express = require("express");
const path = require("path");
const session = require("express-session");

const app = (module.exports = express());

const dbo = require("./db/conn");
const users = require("./routes/users");

// temp config

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: "shhhh, very secret",
  })
);

// Session-persisted message middleware

app.use((req, res, next) => {
  let err = req.session.error;
  let msg = req.session.success;
  delete req.session.error;
  delete req.session.success;
  res.locals.message = "";
  if (err) res.locals.message = '<p class="msg error">' + err + "</p>";
  if (msg) res.locals.message = '<p class="msg success">' + msg + "</p>";
  next();
});

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.use("/", users);

if (!module.parent) {
  app.listen(process.env.PORT || 4000);
  dbo.connectToServer((err) => {
    if (err) throw err;
  });
  console.log("Express started on port 4000");
}
