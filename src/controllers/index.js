const { createUser,
        userLogin,
        detailUser,
        updateUser
  } = require('./user')

const { listCategory } = require('./categories')

module.exports = {
  createUser,
  listCategory,
  userLogin,
  detailUser,
  updateUser
}
