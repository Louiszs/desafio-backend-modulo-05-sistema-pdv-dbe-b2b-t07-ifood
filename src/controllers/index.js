const { createUser, userLogin, detailUser } = require('./user')
const { listCategory } = require('./categories')

module.exports = {
  createUser,
  listCategory,
  userLogin,
  detailUser
}
