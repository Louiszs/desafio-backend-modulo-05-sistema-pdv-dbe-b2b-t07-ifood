const { encryptPassword, insertUser } = require('../../repositories');
const sendEmail = require('./sendEmail');

const createUserAndReturn = async (nome, email, senha) => {
  try {
    const password = await encryptPassword(senha)

    const newUser = await insertUser(nome, email, password);
    sendEmail(email, "criado", "criação")

    return newUser;
  } catch (error) {
    return error.message;
  }
};

module.exports = createUserAndReturn

