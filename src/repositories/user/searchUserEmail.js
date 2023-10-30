const knex = require('../../data/connection');

const searchUserEmail = async (email) => {
  try {
    const usuario = await knex('usuarios').where('email', email).first();

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Email ou senha inválida' });
    }

    return usuario;
  } catch (error) {
    return error.message;
  }
}
module.exports = searchUserEmail
