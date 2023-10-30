const knex = require('../../data/connection')

const insertUser = async (nome, email, senha) => {
  try {
    const usuarioCriado = await knex('usuarios').insert({
      nome,
      email,
      senha
    }).returning(['id', 'nome', 'email']);
    console.log(usuarioCriado)

    return usuarioCriado[0];
  } catch (error) {

  }
}
module.exports = insertUser
