const { refreshUser, encryptPassword, getUserPerId } = require('../../repositories')

const { getToken } = require('../../utils')

const updateUserAndConfirm = async (nome, email, senha, bearer) => {
  const id = getToken(bearer)

  const user = await getUserPerId(id)

  const cryptPassword = await encryptPassword(senha)

  await refreshUser(nome, email, cryptPassword, user.email)
}

module.exports = updateUserAndConfirm
