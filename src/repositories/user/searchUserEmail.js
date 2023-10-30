const knex = require('../../data/connection')

const searchUserEmail = async (email) => {
  try {
    const usuario = await knex('usuarios').where('email', email).first();
    return usuario
  } catch (error) {
    console.error('Erro ao buscar usuário por e-mail:', error);
    return null;
  }
};
module.exports = searchUserEmail
