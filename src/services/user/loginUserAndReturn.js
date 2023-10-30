const {
  searchUserEmail,
  verifyPassword,
  createToken
} = require('../../repositories');

const loginUserAndReturn = async (email, senha) => {
  try {
    const usuario = await searchUserEmail(email)

    const senhaCrypt = await verifyPassword(senha, usuario)

    const tokenCreated = await createToken(usuario)

    return tokenCreated

  } catch (error) {
    error.message;
  }
}

module.exports = loginUserAndReturn;
