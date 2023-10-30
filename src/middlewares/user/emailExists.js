const knex = require('../../data/connection')

const emailExists = async (req, res, next) => {
  try {
    const { email } = req.body;

    const usuarioEncontrado = await knex('usuarios').where({ email }).first();

    if (usuarioEncontrado) {
      return res.status(409).json({
        mensagem: 'E-mail informado está vinculado a outro usuário.'
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  };
};

module.exports = emailExists
