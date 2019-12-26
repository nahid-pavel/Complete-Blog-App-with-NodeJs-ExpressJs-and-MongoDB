const authRoutes = require("./authRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const playRoutes = require("../playgrounds/playRoutes");
const uploadRoutes = require("./uploadRoutes");
const postRoutes = require("./postRoutes");
const apiRoutes = require('./apiRoutes');
const explorerRoutes = require('./explorerRoutes')
const searchRoutes = require('../routes/searchRoutes');
const authorRoutes = require('./authorRoutes');


const routes = [
  {
    path: "/auth",
    handlers: authRoutes
  },
  {
    path: "/dashboard",
    handlers: dashboardRoutes
  },
  {
    path: "/posts",
    handlers: postRoutes
  },
  {
    path: "/api",
    handlers: apiRoutes
  },
  {
    path: "/explorer",
    handlers: explorerRoutes
  },
  {
    path: "/",
    handlers: (req, res) => {
      res.redirect('/explorer')
    }
  },
  {
    path: "/search",
    handlers: searchRoutes
  },
  {
    path: "/play",
    handlers: playRoutes
  },
  {
    path: "/author",
    handlers: authorRoutes
  },
  {
    path: "/upload",
    handlers: uploadRoutes
  }

  
];

module.exports = app => {
  routes.forEach(r => {
    if (r.path === "/") {
      app.get(r.path, r.handlers);
    } else {
      app.use(r.path, r.handlers);
    }
  });
};
