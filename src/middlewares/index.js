const auth = require('./auth');
const {
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass
} = require('./user')

module.exports = {
  auth,
  emailExists,
  verifyNameEmailPassword,
  VerifyLoginEmailPass
};
