const express = require('express');
const rota = express();

const { createUser, listCategory, userLogin } = require("../controllers")

rota.post("/usuario", createUser);
rota.post("/login", userLogin)
rota.get('/categoria', listCategory)


module.exports = rota;
