const knex = require('../../data/connection')

const refreshUser = async(nome, email, senha, userEmail) => {
  await knex('usuarios').update({
    nome,
    email,
    senha
  }).where({
    email: userEmail
  })
}

module.exports = refreshUser
