const jwt = require("jsonwebtoken");
const jwtPassword = require('../jwt/jwtPassword');

const getToken = (bearer) => {
  const token = bearer.split(' ')[1];

	const { id } = jwt.verify(token, jwtPassword);

  return id;
}

module.exports = getToken;
