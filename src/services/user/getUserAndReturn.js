const { getToken } = require('../../utils');
const { getUserPerId } = require('../../repositories');
const { HttpStatusError } = require('../../error');

const getUserAndReturn = (bearer) => {
  const id = getToken(bearer);

  const user = getUserPerId(id);

  return user;
}

module.exports = getUserAndReturn;
