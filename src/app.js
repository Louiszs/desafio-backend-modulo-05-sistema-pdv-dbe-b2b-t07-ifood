const express = require('express');
require('dotenv').config();

const rota = require('./routes/rota');

const app = express();

app.use(express.json());
app.use(rota);

module.exports = app;
