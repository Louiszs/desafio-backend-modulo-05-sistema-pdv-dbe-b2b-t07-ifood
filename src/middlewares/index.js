const auth = require('./auth');
const {
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass,
  userExists
} = require('./user')

module.exports = {
  auth,
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass,
  userExists
};
