const bcrypt = require('bcrypt')

const encryptPassword = async (senha) => {
  try {
    const senhaCriptografada = await bcrypt.hash(senha, 10);
    return senhaCriptografada;
  } catch (error) {
    throw error;
  }
}

module.exports = encryptPassword
