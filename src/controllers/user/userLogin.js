const knex = require('../../data/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jvt = require("../../jwt/jwtPassword")
const { handleError } = require('../../error');

const userLogin = async (req, res) => {
  const { email, senha } = req.body;

  try {
    if (!email || !senha) {
      return res.status(400).json({
        mensagem: 'Preencha os campos obrigatórios: email e senha'
      });
    }

    const usuario = await knex('usuarios').where('email', email).first();

    if (!usuario) {
      return res.status(404).json({ mensagem: 'Email ou senha inválida' });
    }

    const senhavalida = await bcrypt.compare(senha, usuario.senha);

    if (!senhavalida) {
      return res.status(400).json({ mensagem: 'Email ou senha inválida' });
    }

    const token = jwt.sign({ id: usuario.id }, jvt, { expiresIn: process.env.JWT_EXPIRES });
    const { senha: _, ...usuarioLogado } = usuario;

    return res.json({ usuario: usuarioLogado, token });
  } catch (error) {
    handleError(res, error, 400);
  }
};

module.exports = userLogin;
