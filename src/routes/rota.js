const express = require('express');
const rota = express();

const { createUser, listCategory } = require("../controllers")

rota.post("/usuario", createUser);
rota.get('/categoria', listCategory)

module.exports = rota;
