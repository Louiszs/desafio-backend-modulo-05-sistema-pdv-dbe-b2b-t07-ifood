const jwt = require('jsonwebtoken');
const jvt = require("../../jwt/jwtPassword")

const createToken = async (usuario) => {

  const token = jwt.sign({ id: usuario.id }, jvt, { expiresIn: process.env.JWT_EXPIRES });

  const { senha: _, ...usuarioLogado } = usuario;
  // console.log(usuarioLogado)
  return {
    usuarioLogado,
    token
  }
}

module.exports = createToken
