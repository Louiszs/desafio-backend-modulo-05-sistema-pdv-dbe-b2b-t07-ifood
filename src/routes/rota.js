const express = require('express');
const rota = express();

const createUser = require("../controllers/user/createUser")
const listCategory = require("../controllers/categories/listCategory")

rota.post("/usuario", createUser);
rota.get('/categoria', listCategory)

module.exports = rota;