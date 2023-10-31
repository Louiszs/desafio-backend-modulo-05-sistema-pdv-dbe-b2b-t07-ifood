const express = require('express');
const routes = express();

const {
  createUser,
  listCategory,
  userLogin,
  detailUser,
  updateUser
} = require("../controllers");

const {
  auth,
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass,
  userExists
} = require('../middlewares');

routes.post("/usuario", verifyNameEmailPassword, emailExists, createUser);
routes.post("/login", userExists, VerifyLoginEmailPass, userLogin);
routes.use(auth);
routes.get('/categoria', listCategory);
routes.get('/usuario', detailUser);
routes.put('/usuario', verifyNameEmailPassword, updateUser)

module.exports = routes;
