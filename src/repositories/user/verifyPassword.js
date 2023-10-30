const bcrypt = require('bcrypt')

const verifyPassword = async (senha, usuario) => {
  try {
    const senhavalida = await bcrypt.compare(senha, usuario.senha);
    if (!senhavalida) {
      return res.status(400).json({ mensagem: 'Email ou senha inválida' });
    }
  } catch (error) {
    error.message;
  }
}

module.exports = verifyPassword;
