const jwt = require('jsonwebtoken');
const jwtPassword = require('../../jwt/jwtPassword')
const knex = require('../../data/connection');

const auth = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    const token = authorization.split(' ')[1];

    const { id } = jwt.verify(token, jwtPassword);

    const usuario = await knex('usuarios').where('id', id).first();

    if (!usuario) {
      return res.status(401).json({ mensagem: 'Não autorizado' });
    }

    next();
  } catch (error) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }
};

module.exports = auth;
