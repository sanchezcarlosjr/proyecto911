"use strict";

/**
 * Module dependencies.
 */

const express = require("express");
const router = express.Router();
const hash = require("pbkdf2-password")();

// database

const dbo = require("../db/conn");
// const ObjectId = require("mongodb").ObjectId;

function authenticate(name, pass, fn) {
  if (!module.parent) console.log("authenticating %s:%s", name, pass);
  const db = dbo.getDb();
  db.collection("users").findOne({ username: name }, (err, result) => {
    if (err) throw err;
    let user = result;
    // query the db for the given username
    if (!user) return fn(null, null);
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash({ password: pass, salt: user.salt }, (err, pass, salt, hash) => {
      if (err) return fn(err);
      if (hash === user.hash) return fn(null, user);
      fn(null, null);
    });
  });

}

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access denied!";
    res.redirect("/login");
  }
}

router.get("/restricted", restrict, (req, res) => {
  res.send('Wahoo! restricted area, click to <a href="/logout">logout</a>');
});

router.get("/logout", (req, res) => {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  authenticate(req.body.username, req.body.password, (err, user) => {
    if (err) return next(err);
    if (user) {
      // Regenerate session when signing in
      // to prevent fixation
      req.session.regenerate(() => {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user = user;
        req.session.success =
          "Authenticated as " +
          user.name +
          ' click to <a href="/logout">logout</a>. ' +
          ' You may now access <a href="/restricted">/restricted</a>.';
        res.redirect("back");
      });
    } else {
      req.session.error =
        "Authentication failed, please check your " +
        " username and password." +
        ' (use "tj" and "foobar")';
      res.redirect("/login");
    }
  });
});

function create(name, pass) {
  if (!module.parent) console.log("creating %s:%s", name, pass);
  const db = dbo.getDb();
  // when you create a user, generate a salt
  // and hash the password
  hash({ password: pass }, (err, pass, salt, hash) => {
    if (err) throw err;
    db.collection("users").insertOne({
      username: name,
      salt: salt,
      hash: hash,
    });
  });
}

router.post("/signup", (req, res, next) => {
  create(req.body.username, req.body.password);
});

module.exports = router;
