const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { bindUserWithRequest } = require("./authMiddlewares");
const { setLocals } = require("./setLocals");
const flash = require("connect-flash");

const MONGODB_URI = `mongodb://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@ds159036.mlab.com:59036/blogdb`;

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
  expires: 1000 * 60 * 60 * 2
});

const middleWares = [
  morgan("dev"),
  express.static("public"),
  express.urlencoded({ extended: true }),
  express.json(),
  session({
    secret: process.env.SECRET_KEY || "SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: store
  }),
  bindUserWithRequest(),
  setLocals(),
  flash()
];

module.exports = app => {
  middleWares.forEach(m => {
    app.use(m);
  });
};
