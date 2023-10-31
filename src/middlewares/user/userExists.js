const knex = require('../../data/connection')
const userExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const usuario = await knex('usuarios').where('email', email).first();
    if (!usuario) {
      return res.status(409).json({
        mensagem: 'Nenhum usuário encontrado com o e-mail especificado'
      })
    }
    next();

  } catch (error) {
    return error.message;
  }
};

module.exports = userExists;

