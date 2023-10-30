const express = require('express');
const routes = express();

const {
  createUser,
  listCategory,
  userLogin,
  detailUser,
} = require("../controllers");

const {
  auth,
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass
} = require('../middlewares');

routes.post("/usuario", verifyNameEmailPassword, emailExists, createUser);
routes.post("/login", VerifyLoginEmailPass, userLogin);
routes.use(auth);
routes.get('/categoria', listCategory);
routes.get('/usuario', detailUser);

module.exports = routes;
