const {
  searchUserEmail,
  verifyPassword,
  createToken,
} = require('../../repositories');
const sendEmail = require('./sendEmail')
const loginUserAndReturn = async (email, senha) => {
  try {
    const usuario = await searchUserEmail(email)

    const senhaCrypt = await verifyPassword(senha, usuario)

    const tokenCreated = await createToken(usuario)

    sendEmail(email, "logado", "login")

    return tokenCreated

  } catch (error) {
    error.message;
  }
}

module.exports = loginUserAndReturn;
