const auth = require('./auth');
const { emailExists, verifyNameEmailPassword } = require('./user')

module.exports = {
  auth,
  emailExists,
  verifyNameEmailPassword
};
