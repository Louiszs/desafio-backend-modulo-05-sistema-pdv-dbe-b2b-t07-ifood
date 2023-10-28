const express = require('express');
const routes = express();

const { createUser,
        listCategory,
        userLogin,
        detailUser
      } = require("../controllers");

const { auth } = require('../middlewares');

routes.post("/usuario", createUser);
routes.post("/login", userLogin);
routes.use(auth);
routes.get('/categoria', listCategory);
routes.get('/usuario', detailUser);

module.exports = routes;
