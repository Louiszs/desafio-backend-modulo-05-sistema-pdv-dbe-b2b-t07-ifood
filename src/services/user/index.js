const getUserAndReturn = require('./getUserAndReturn');
const createUserAndReturn = require('./createUserAndReturn');
const loginUserAndReturn = require('./loginUserAndReturn');
const sendEmail = require('./sendEmail')
const updateUserAndConfirm = require('./updateUserAndConfirm')

module.exports = {
  getUserAndReturn,
  createUserAndReturn,
  loginUserAndReturn,
  sendEmail,
  updateUserAndConfirm
}
