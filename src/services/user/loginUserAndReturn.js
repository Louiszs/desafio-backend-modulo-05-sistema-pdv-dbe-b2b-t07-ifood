const {
  searchUserEmail,
  verifyPassword,
  createToken,
} = require('../../repositories');
//? Implementação de e-mail futura const sendEmail = require('./sendEmail')
const loginUserAndReturn = async (email, senha) => {
  try {
    const user = await searchUserEmail(email)

    await verifyPassword(senha, user)

    const tokenCreated = await createToken(user)

    //? Implementação de e-mail futura sendEmail(email, "logado", "login")

    return tokenCreated

  } catch (error) {
    error.message;
  }
}

module.exports = loginUserAndReturn;
